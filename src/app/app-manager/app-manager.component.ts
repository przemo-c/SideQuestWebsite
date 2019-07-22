import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  Router
} from "@angular/router";
import { AppService } from "../app.service";
import { ExpanseClientService } from "../expanse-client.service";
import { AppListing } from "../account/account.component";
import { Subscription } from "rxjs";
import * as urlParser from "../../../node_modules/js-video-url-parser/lib/base";
import "js-video-url-parser/lib/provider/vimeo";
import "js-video-url-parser/lib/provider/youtube";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";

import * as moment from "moment";
import DateOptions = Pickadate.DateOptions;
import DateItem = Pickadate.DateItem;
export interface VideObject {
  id: string;
  mediaType: string;
  provider: string;
}
export interface AppCounter {
  counter: number;
  type: string;
}
export interface AppUrl {
  link_url: string;
  provider: string;
}
export interface ScreenShot {
  image_url: string;
}

interface GithubRepo {
  name: string;
}

interface BeatOnModJson {
  id: string;
  name: string;
  author: string;
  description: string[];
  gameVersion: string;
  version: string;
  platform: string;
  category: string;
}

export interface GithubRelease {
  name?: string;
  tag_name: string;
  assets?: any[];
}

@Component({
  selector: "app-app-manager",
  templateUrl: "./app-manager.component.html",
  styleUrls: ["./app-manager.component.css"]
})
export class AppManagerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("release_input", { static: false }) release_input;
  @ViewChild("repo_input", { static: false }) repo_input;
  @ViewChild("chart", { static: false }) chart;
  @ViewChild("dropJson", { static: false }) dropJson;
  @ViewChild("addImage", { static: false }) addImage;
  @ViewChild("addScreenshot", { static: false }) addScreenshot;
  apps_id: string;
  addNewUrlType = "APK";
  addNewUrlLink: string;
  is_not_found: boolean;
  is_loading_icon: boolean;
  is_loading_screenshot: boolean;
  screenshots: string[] = [];
  currentScreenshot: number;
  currentApp: AppListing = {
    name: "",
    app_categories_id: "1",
    image_url: "",
    video_url: "",
    comfort: 0,
    summary: "",
    description: "",
    apk_url: "",
    packagename: "",
    versioncode: 0,
    versionname: "",
    license: "FREE",
    website: "",
    donate_url: "",
    github_name: "",
    github_repo: "",
    github_tag: "",
    github_enabled: false,
    early_access: false,
    updated: 0,
    created: 0,
    supports_quest: true,
    supports_go: false,
    supports_other: false,
    search_tags: "",
    is_first_publish: false,
    active: false,
    deleted: false
  };
  sub: Subscription;
  videoObject: VideObject;
  videoUrl: SafeUrl;
  debounceTimeout: number;
  hasGithubName: boolean;
  hasGithubRepo: boolean;
  isGettingGithub: boolean;
  isDragging: boolean;
  app_urls: AppUrl[] = [];
  comfortAutocomplete: { data: { [key: string]: string } };
  repoAutoComplete: { data: { [key: string]: string }; limit: number };
  releaseAutoComplete: { data: { [key: string]: string }; limit: number };
  urlTypes: string[];
  searchTags: Materialize.ChipDataObject[] = [];
  githubRepos: GithubRepo[];
  githubReleases: GithubRelease[];
  constructor(
    private router: Router,
    private service: AppService,
    private expanseService: ExpanseClientService,
    private sanitizer: DomSanitizer,
    route: ActivatedRoute
  ) {
    this.sub = this.router.events.subscribe(async val => {
      if (val instanceof NavigationEnd) {
        this.apps_id = route.snapshot.paramMap.get("apps_id");
        if (this.apps_id) {
          const apps = (await this.expanseService
            .start()
            .then(() =>
              this.expanseService.getApp(this.apps_id)
            )) as AppListing[];
          if (!apps.length) {
            this.apps_id = null;
            this.is_not_found = true;
          } else {
            this.currentApp = apps[0];
            this.searchTags = (this.currentApp.search_tags || "")
              .split(",")
              .filter(t => t)
              .map(t => ({ tag: t }));
            this.hasGithubName = !!this.currentApp.github_name;
            if (this.hasGithubName) {
              await this.findGitRepos();
            }
            this.hasGithubRepo = !!this.currentApp.github_repo;
            if (this.hasGithubRepo) {
              await this.findGitReleases();
            }
            const screenshots = (await this.expanseService.getAppScreenshots(
              this.apps_id
            )) as ScreenShot[];
            this.app_urls = (await this.expanseService.getAppUrls(
              this.apps_id
            )) as AppUrl[];
            this.screenshots = (screenshots || []).map(s => s.image_url);
            this.onVideoChange();
          }
        }
      }
    });
  }

  ngOnInit(): void {
    this.setAutoComplete();
    this.setupDatePicker();
  }

  setupDatePicker() {}
  ngAfterViewInit() {
    const eleImage = this.addImage.nativeElement;
    eleImage.ondrop = e => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.files.length) {
        this.is_loading_icon = true;
        this.uploadFile(
          e.dataTransfer.files[0],
          e.dataTransfer.files[0].name
        ).then((res: any) => {
          this.currentApp.image_url = this.expanseService.cdnUrl + res.path;
          this.is_loading_icon = false;
        });
      }
    };
    const eleScreenshot = this.addScreenshot.nativeElement;
    eleScreenshot.ondrop = e => {
      e.preventDefault();
      e.stopPropagation();
      this.is_loading_screenshot = true;
      if (e.dataTransfer.files.length) {
        this.uploadFile(
          e.dataTransfer.files[0],
          e.dataTransfer.files[0].name
        ).then((res: any) => {
          this.screenshots.push(this.expanseService.cdnUrl + res.path);
          this.is_loading_screenshot = false;
        });
      }
    };

    const ele = this.dropJson.nativeElement;

    ele.ondrop = e => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.files.length) {
        const reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (e: any) => {
          // Render thumbnail.
          try {
            const json: BeatOnModJson = JSON.parse(
              e.target.result
            ) as BeatOnModJson;
            if (json.id) {
              this.currentApp.packagename = "com.beatonmod." + json.id;
            }
            const searchTags: Materialize.ChipDataObject[] = [];
            if (json.gameVersion) {
              searchTags.push({
                tag: json.gameVersion.toString()
              } as Materialize.ChipDataObject);
            }
            if (json.category) {
              searchTags.push({
                tag: json.category.toString()
              } as Materialize.ChipDataObject);
            }
            this.searchTags = searchTags;
            if (json.version) {
              this.currentApp.versionname = json.version.toString();
            }
            if (json.description && json.description.length) {
              this.currentApp.description = json.description[0].toString();
            }
            if (json.author) {
              this.currentApp.summary = "by " + json.author.toString();
            }
            if (json.name) {
              this.currentApp.name = json.name.toString();
            }
            this.currentApp.versioncode = 1;
            this.currentApp.app_categories_id = "4";
          } catch (e) {
            this.service.showMessage(
              { error: true, data: "Could not parse json!!" },
              ""
            );
          }
        };

        // Read in the image file as a data URL.
        reader.readAsText(e.dataTransfer.files[0]);
      }
    };
  }

  onAddTag(e) {
    console.log(this.searchTags);
  }

  addAppUrl() {
    this.app_urls.push({
      link_url: this.addNewUrlLink,
      provider: this.addNewUrlType
    });
  }

  setAutoComplete() {
    this.comfortAutocomplete = {
      data: {
        Comfortable: null,
        Moderate: null
      }
    };
    this.urlTypes = [
      "APK",
      "OBB",
      "BeatOn Mod",
      "Oculus Quest",
      "Oculus Go",
      "Oculus Rift",
      "Oculus GearVR",
      "Steam Page",
      "Viveport",
      "Epic Store",
      "Patreon",
      "Paypal",
      "Itch",
      "Kofi",
      "Website",
      "Github",
      "Reddit",
      "Twitch",
      "Discord",
      "Twitter",
      "Youtube",
      "Facebook",
      "Instagram",
      "Vimeo"
    ];
  }

  debounce(fn) {
    this.isGettingGithub = true;
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => fn.call(this), 750);
  }

  findGitRepos() {
    this.hasGithubName = false;
    return fetch(
      "https://api.github.com/users/" + this.currentApp.github_name + "/repos"
    ).then(async r => {
      if (r.ok) {
        this.githubRepos = await r.json();
        this.hasGithubName = true;
      } else {
        this.hasGithubName = false;
      }
      this.isGettingGithub = false;
    });
  }

  findGitReleases() {
    this.hasGithubRepo = false;
    return fetch(
      "https://api.github.com/repos/" +
        this.currentApp.github_name +
        "/" +
        this.currentApp.github_repo +
        "/releases"
    ).then(async r => {
      if (r.ok) {
        this.githubReleases = await r.json();
        this.githubReleases.unshift({ tag_name: "[ latest ]" });
        this.githubReleases.unshift({ tag_name: "[ all ]" });
        this.hasGithubRepo = true;
      } else {
        this.hasGithubRepo = false;
      }
      this.isGettingGithub = false;
    });
  }

  onVideoChange() {
    this.videoObject = urlParser.parse(this.currentApp.video_url);
    if (this.videoObject) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.videoObject.provider === "youtube"
          ? "https://www.youtube.com/embed/" + this.videoObject.id
          : "https://player.vimeo.com/video/" +
              this.videoObject.id +
              "?byline=0&portrait=0"
      );
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  uploadIcon() {
    this.uploadImage(true).then((res: any) => {
      this.currentApp.image_url = this.expanseService.cdnUrl + res.path;
    });
  }

  uploadScreenshot() {
    this.uploadImage(false).then((res: any) => {
      this.screenshots.push(this.expanseService.cdnUrl + res.path);
    });
  }

  uploadImage(is_icon) {
    return new Promise((resolve, reject) => {
      let upload = document.createElement("input");
      upload.setAttribute("type", "file");
      upload.style.display = "none";
      let has_files = false;
      upload.addEventListener("change", e => {
        if ((e.target as any).files.length) {
          if (is_icon) {
            this.is_loading_icon = true;
          } else {
            this.is_loading_screenshot = true;
          }
          this.uploadFile(
            (e.target as any).files[0],
            (e.target as any).files[0].name
          ).then(res => {
            if (is_icon) {
              this.is_loading_icon = false;
            } else {
              this.is_loading_screenshot = false;
            }
            resolve(res);
          });
        }
        document.body.removeChild(upload);
      });
      document.onfocus = function() {
        console.log("on focus");
        document.onfocus = null;
        setTimeout(function() {
          if (!has_files) {
            reject();
          }
        }, 1000);
      };
      document.body.appendChild(upload);
      upload.click();
    });
  }
  uploadFile(file, filename) {
    let formData = new FormData();
    formData.append("file", file, filename);
    let cdnToken;
    return this.expanseService
      .getCurrentSession()
      .then((resp: any) => {
        cdnToken = resp.token;
      })
      .then(() =>
        fetch(
          this.expanseService.cdnUrl +
            "create-upload/" +
            cdnToken +
            "/?" +
            new Date().getTime()
        )
      )
      .then(res => res.json())
      .then(json =>
        fetch(
          this.expanseService.cdnUrl +
            "upload-file/" +
            cdnToken +
            "/" +
            json.fileId +
            "/" +
            (filename || file.name),
          {
            method: "post",
            body: formData
          }
        )
      )
      .then(res => res.json());
  }

  async saveApp() {
    this.currentApp.search_tags = (this.searchTags || [])
      .map(t => t.tag)
      .join(",");
    if (this.apps_id) {
      this.expanseService
        .editApp(
          this.apps_id,
          this.currentApp.name,
          this.currentApp.image_url,
          this.currentApp.video_url,
          this.currentApp.comfort,
          this.currentApp.summary,
          this.currentApp.description,
          this.currentApp.apk_url,
          this.currentApp.packagename,
          this.currentApp.versioncode,
          this.currentApp.versionname,
          this.currentApp.license,
          this.currentApp.website,
          this.currentApp.donate_url,
          this.currentApp.github_name,
          this.repo_input
            ? this.repo_input.nativeElement.value
            : this.currentApp.github_repo,
          this.release_input
            ? this.release_input.nativeElement.value
            : this.currentApp.github_tag,
          this.currentApp.github_enabled,
          this.currentApp.app_categories_id,
          this.screenshots,
          this.currentApp.supports_quest,
          this.currentApp.supports_go,
          this.currentApp.supports_other,
          this.currentApp.search_tags,
          this.app_urls,
          this.currentApp.early_access
        )
        .then((res: any) => {
          this.service.showMessage(res, "App Saved!");
          console.log(this.currentApp.active);
          if (!this.currentApp.active) {
            this.sendForApproval(this.apps_id);
          }
        });
    } else {
      this.expanseService
        .addApp(
          this.currentApp.name,
          this.currentApp.image_url,
          this.currentApp.video_url,
          this.currentApp.comfort,
          this.currentApp.summary,
          this.currentApp.description,
          this.currentApp.apk_url,
          this.currentApp.packagename,
          this.currentApp.versioncode,
          this.currentApp.versionname,
          this.currentApp.license,
          this.currentApp.website,
          this.currentApp.donate_url,
          this.currentApp.github_name,
          this.currentApp.github_repo,
          this.currentApp.github_tag,
          this.currentApp.github_enabled,
          this.currentApp.app_categories_id,
          this.screenshots,
          this.currentApp.supports_quest,
          this.currentApp.supports_go,
          this.currentApp.supports_other,
          this.currentApp.search_tags,
          this.app_urls,
          this.currentApp.early_access
        )
        .then((res: any) => {
          this.service.showMessage(res, "App Saved!");
          if (!res.error && res.length) {
            this.sendForApproval(res[0].apps_id).then(() =>
              this.router.navigateByUrl("/my-app/" + res[0].apps_id)
            );
          }
        });
    }
  }

  sendForApproval(apps_id) {
    return fetch("https://shanesedit.org:5678/new_app/" + apps_id);
  }

  deleteApp() {
    this.expanseService.deleteApp(this.apps_id).then(() => {
      return this.router.navigateByUrl("/account");
    });
  }

  deleteScreenShot() {
    this.screenshots.splice(this.currentScreenshot, 1);
    this.currentScreenshot = null;
  }

  removeUrl(index: number) {
    this.app_urls.splice(index, 1);
  }
}
