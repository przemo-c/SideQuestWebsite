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
import { UploadService } from "../upload.service";
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
  id?: number;
  isSideQuestOption?: boolean;
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
    versioncode: 1,
    versionname: "0.0.1",
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
  debounceTimeout: any;
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
  loading = true;
  dropFn: any;
  constructor(
    private router: Router,
    private service: AppService,
    public expanseService: ExpanseClientService,
    private sanitizer: DomSanitizer,
    route: ActivatedRoute,
    public uploadService: UploadService
  ) {
    this.dropFn = (e: any) => {
      e = e || event;
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
            const searchTags: Materialize.ChipDataObject[] = [
              { tag: "BeatOn" }
            ];
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
            if (json.version) {
              this.currentApp.versionname = json.version.toString();
            }
            if (json.description && json.description.length) {
              this.currentApp.description = json.description[0].toString();
            }
            if (json.author) {
              searchTags.push({
                tag: json.author.toString()
              } as Materialize.ChipDataObject);
              this.currentApp.summary = "by " + json.author.toString();
            }
            if (json.name) {
              this.currentApp.name = json.name.toString();
            }
            this.searchTags = searchTags;
            this.currentApp.versioncode = 1;
            this.currentApp.app_categories_id = "4";
            this.currentApp.website = "BeatOn";
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
    window.addEventListener("drop", this.dropFn, false);
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
            if (!this.currentApp.apk_url) {
              this.currentApp.apk_url = (await this.expanseService.getAppWebhook(
                this.apps_id
              )) as string;
            }
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
          this.loading = false;
        } else {
          await this.expanseService.getUserSettings();
          this.loading = false;
          this.app_urls = [].slice.call(this.expanseService.default_app_ulrs);
        }
      }
    });
  }

  ngOnInit(): void {
    this.setAutoComplete();
    this.setupDatePicker();
  }

  setupDatePicker() {}
  ngAfterViewInit() {}

  copyShareUrl(isRefresh?) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.currentApp.donate_url).then(
        () => {
          this.service.showMessage(
            { error: false },
            isRefresh
              ? "Share URL Refreshed and Copied to clipboard!"
              : "Share URL Copied to clipboard!"
          );
        },
        err => {
          this.service.showMessage(
            { error: true, data: "Cant copy share url!" },
            ""
          );
        }
      );
    }
  }

  copyUrl(url) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(
        () => {
          this.service.showMessage(
            { error: false },
            "URL Copied to clipboard!"
          );
        },
        err => {
          this.service.showMessage(
            { error: true, data: "Cant copy share url!" },
            ""
          );
        }
      );
    }
  }

  refreshShareLink() {
    return this.service
      .refreshShareLink(
        this.expanseService,
        "a",
        this.apps_id,
        this.currentApp.name + " on SideQuest",
        this.currentApp.description,
        this.currentApp.image_url,
        "https://sidequestvr.com/#/app/" + this.apps_id
      )
      .then(r => (this.currentApp.donate_url = r.url));
    // return fetch(
    //   "https://xpan.cc/delete-link/" +
    //     this.expanseService.currentSession.token +
    //     "/a-" +
    //     this.apps_id,
    //   {
    //     method: "GET",
    //     cache: "no-cache"
    //   }
    // )
    //   .then(() =>
    //     fetch(
    //       "https://xpan.cc/get-link/" +
    //         this.expanseService.currentSession.token,
    //       {
    //         method: "POST",
    //         headers: {
    //           Accept: "application/json",
    //           "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //           title: this.currentApp.name + " on SideQuest",
    //           description: this.currentApp.description,
    //           image: this.currentApp.image_url,
    //           name: "a-" + this.apps_id,
    //           external: "https://sidequestvr.com/#/app/" + this.apps_id
    //         })
    //       }
    //     )
    //   )
    //   .then(r => r.json())
    //   .then(r => (this.currentApp.donate_url = r.url));
  }

  onAddTag(e) {
    // console.log(this.searchTags);
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
      "Vimeo",
      "SynthRiders Mod",
      "Firefox Skybox",
      "BeatOn Mod"
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
        this.githubReleases.unshift({
          tag_name: "[ latest ]",
          isSideQuestOption: true
        });
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
    window.removeEventListener("drop", this.dropFn, false);
  }

  uploadIcon() {
    this.uploadService.uploadImage(true).then((res: any) => {
      this.currentApp.image_url = this.expanseService.cdnUrl + res.path;
    });
  }

  uploadScreenshot() {
    this.uploadService.uploadImage(false).then((res: any) => {
      this.screenshots.push(this.expanseService.cdnUrl + res.path);
    });
  }

  backFillGithubRelease() {
    let releases = (this.githubReleases || []).filter(
      r => !r.isSideQuestOption
    );
    if (
      this.currentApp.github_enabled &&
      this.hasGithubRepo &&
      this.hasGithubRepo &&
      releases.length
    ) {
      let release = releases[0];
      if (
        this.currentApp.github_tag !== "[ all ]" &&
        this.currentApp.github_tag !== "[ latest ]"
      ) {
        releases.forEach(rel => {
          if (rel.tag_name === this.currentApp.github_tag) {
            release = rel;
          }
        });
      }
      this.currentApp.versioncode = release.id;
      this.currentApp.versionname = release.tag_name;
      this.app_urls = this.app_urls
        .filter(url => url.provider !== "Github Release")
        .concat(
          release.assets
            .filter((asset: any) => {
              return (
                ["apk", "obb"].indexOf(
                  asset.name
                    .split(".")
                    .pop()
                    .toLowerCase()
                ) > -1
              );
            })
            .map(asset => {
              return {
                link_url: asset.browser_download_url,
                provider: "Github Release"
              };
            })
        );
    }
  }

  async saveApp() {
    this.backFillGithubRelease();
    this.currentApp.search_tags = (this.searchTags || [])
      .map(t => t.tag)
      .join(",");
    if (this.apps_id) {
      this.refreshShareLink()
        .then(() =>
          this.expanseService.editApp(
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
        )
        .then((res: any) => {
          this.service.showMessage(res, "App Saved!");
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
            this.apps_id = res[0].apps_id;
            this.refreshShareLink();
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
