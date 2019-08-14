import { Component, OnDestroy, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { EventListing, SpaceListing } from "../account/account.component";
import { Subscription } from "rxjs";
import { VideObject } from "../app-manager/app-manager.component";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { ExpanseClientService } from "../expanse-client.service";
import { UploadService } from "../upload.service";
import { AppService } from "../app.service";
import * as urlParser from "../../../node_modules/js-video-url-parser/lib/base";
import { SpaceTemplates } from "./space-templates";
import * as uuidv4 from "uuid/v4";

@Component({
  selector: "app-space-manager",
  templateUrl: "./space-manager.component.html",
  styleUrls: ["./space-manager.component.css"]
})
export class SpaceManagerComponent implements OnInit, OnDestroy {
  currentApp: SpaceListing & { scenes?: any } = {
    name: "",
    description: "",
    image: "",
    current_users: "0",
    updated: 0,
    video_url: "",
    space_url: "",
    app_url: "",
    share_url: "",
    is_approved: false
  };
  sub: Subscription;
  spaces_id: string;
  videoObject: VideObject;
  videoUrl: SafeUrl;
  is_not_found: boolean;
  loading = true;
  spaceTemplates = [
    {
      name: "Blank Space",
      image: "https://cdn.theexpanse.app/file/1301/thisone.png",
      description: "A blank template to paint your dreams on",
      url: "",
      spawn: { x: 0, y: 0, z: 0 },
      offset: { x: 0, y: 0, z: 0 },
      selected: false
    },
    {
      name: "Aurora",
      image: "https://cdn.theexpanse.app/file/1119/Untitled-1%20(2).jpg",
      description:
        "A beautiful space to enjoy the northern lights with your friends by the campfire!",
      url:
        "https://github.com/the-expanse/StaticScenes/releases/download/7.0/tuscany",
      spawn: { x: 0, y: 0, z: 0 },
      offset: { x: 0, y: 0, z: 0 },
      selected: false
    },
    {
      name: "Tuscany",
      image: "https://cdn.theexpanse.app/file/1914/ezgif-5-9db8e0b6238a.jpg",
      description: "A fresh cup of nostalgia!",
      url:
        "https://github.com/the-expanse/StaticScenes/releases/download/7.0/tuscany",
      spawn: { x: 0, y: 0, z: 0 },
      offset: { x: 0, y: 0, z: 0 },
      selected: false
    },
    {
      name: "Mortuary",
      image:
        "https://cdn.theexpanse.app/file/1944/selfie_2019-08-14_16_44_44.jpg",
      description: "Come explore what secrets this space holds. ",
      url:
        "https://github.com/the-expanse/StaticScenes/releases/download/5.1/world",
      spawn: { x: 0, y: 0, z: 0 },
      offset: { x: 0, y: 0, z: 0 },
      selected: false
    },
    {
      name: "Basement",
      image:
        "https://cdn.theexpanse.app/file/1948/selfie_2019-08-14_16_57_10.jpg",
      description:
        "Batten down the hatches in the doomsday safe underground fortified bunker. " +
        "Find your way out of the bunker to see daylight again. ",
      url:
        "https://github.com/the-expanse/StaticScenes/releases/download/4.1/world",
      spawn: { x: 0, y: 0, z: 0 },
      offset: { x: 0, y: 0, z: 0 },
      selected: false
    },
    {
      name: "Low Poly Western",
      image:
        "https://cdn.theexpanse.app/file/1952/selfie_2019-08-14_17_03_46.jpg",
      description:
        "Come hang out in this awesome western themed space, call someone out of the saloon for a draw! ",
      url:
        "https://github.com/the-expanse/StaticScenes/releases/download/3.1/world",
      spawn: { x: 0, y: 0, z: 0 },
      offset: { x: 0, y: 0, z: 0 },
      selected: false
    },
    // {
    //   name: "Abandoned Colony",
    //   image: "https://cdn.theexpanse.app/file/1956/Abandoned%20Colony.jpg",
    //   description: "Explore this abandoned colony, try to find out what happened.",
    //   url: "https://github.com/the-expanse/StaticScenes/releases/download/2.1/world",
    //   spawn: { x: 0, y: 0, z: 0}, offset: { x: 0, y: 0, z: 0},
    //   selected: false
    //   },
    {
      name: "Fae's Castle",
      image:
        "https://cdn.theexpanse.app/file/2008/selfie_2019-08-14_20_56_32.jpg",
      description: "Collect all the coins!",
      url:
        "https://github.com/the-expanse/StaticScenes/releases/download/8.0/peach",
      spawn: { x: 3, y: 11, z: 0 },
      offset: { x: 0, y: 0, z: 0 },
      selected: false
    },
    {
      name: "Wanderers",
      image: "https://cdn.theexpanse.app/file/2012/w.jpg",
      description: "A new planet with new possibilities.",
      url:
        "https://github.com/the-expanse/StaticScenes/releases/download/9.0/wanderers",
      spawn: { x: 6, y: 3, z: 0 },
      offset: { x: 0, y: 0, z: 0 },
      selected: false
    },
    // {
    //   name: "Air Ship",
    //   image: "https://cdn.theexpanse.app/file/1960/selfie_2019-08-14_17_12_31.jpg",
    //   description: "Float high above with this Airship.",
    //   url: "https://github.com/the-expanse/StaticScenes/releases/download/10.0/ship_in_clouds",
    //   spawn: { x: 0, y: 0, z: 0}, offset: { x: 0, y: 0, z: 0},
    //   selected: false
    // },
    {
      name: "Abandoned Colony",
      image:
        "https://cdn.theexpanse.app/file/1960/selfie_2019-08-14_17_12_31.jpg",
      description:
        "Explore this abandoned colony, try to find out what happened.",
      url:
        "https://github.com/the-expanse/StaticScenes/releases/download/1.1/world",
      spawn: { x: 0, y: 0, z: 0 },
      offset: { x: 0, y: 0, z: 0 },
      selected: false
    },
    {
      name: "Unity Junkyard",
      image:
        "https://cdn.theexpanse.app/file/1964/selfie_2019-08-14_17_17_47.jpg",
      description: "See what hidden treasures this junk yard contains!",
      url:
        "https://github.com/the-expanse/StaticScenes/releases/download/0.1/mecanimexamplescene",
      spawn: { x: 0, y: 0, z: 0 },
      offset: { x: 0, y: 0, z: 0 },
      selected: false
    },
    {
      name: "J5",
      image:
        "https://cdn.theexpanse.app/file/1968/selfie_2019-08-14_17_21_28.jpg",
      description: "Jonny five is alive and he needs input!",
      url:
        "https://github.com/the-expanse/StaticScenes/releases/download/0.0.5/jj5",
      spawn: { x: 0, y: 0, z: 0 },
      offset: { x: 0, y: 0, z: 0 },
      selected: false
    }
  ];
  constructor(
    private router: Router,
    private service: AppService,
    private expanseService: ExpanseClientService,
    private sanitizer: DomSanitizer,
    route: ActivatedRoute,
    public uploadService: UploadService
  ) {
    this.sub = this.router.events.subscribe(async val => {
      if (val instanceof NavigationEnd) {
        this.spaces_id = route.snapshot.paramMap.get("spaces_id");
        if (this.spaces_id) {
          let space: any = await this.expanseService
            .start()
            .then(() => this.expanseService.getSpace(Number(this.spaces_id)));
          this.currentApp.name = space.name;
          this.currentApp.description = space.description;
          this.currentApp.image = space.image;
          this.currentApp.video_url = space.video_url;
          this.currentApp.space_url = space.space_url;
          this.currentApp.app_url = space.app_url;
          this.currentApp.share_url = space.share_url;
          this.currentApp.is_approved = space.is_approved;
          this.currentApp.scenes = space.scenes;
          console.log(space);
          this.onVideoChange();
          this.loading = false;
        } else {
          this.loading = false;
        }
      }
    });
  }

  uploadIcon() {
    this.uploadService.uploadImage(true).then((res: any) => {
      this.currentApp.image = this.expanseService.cdnUrl + res.path;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onVideoChange() {
    this.videoObject = urlParser.parse(this.currentApp.video_url || "");
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

  refreshShareLink() {
    return fetch(
      "https://xpan.cc/delete-link/" +
        this.expanseService.currentSession.token +
        "/s-" +
        this.spaces_id,
      {
        method: "GET",
        cache: "no-cache"
      }
    )
      .then(() =>
        fetch(
          "https://xpan.cc/get-link/" +
            this.expanseService.currentSession.token,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title: this.currentApp.name + "on Sidequest",
              description: this.currentApp.description,
              image: this.currentApp.image,
              name: "s-" + this.spaces_id,
              external: "https://sidequestvr.com/#/space/" + this.spaces_id
            })
          }
        )
      )
      .then(r => r.json())
      .then(r => (this.currentApp.share_url = r.url));
  }

  selectTemplate(template) {
    this.spaceTemplates.forEach(t => (t.selected = false));
    template.selected = true;
  }

  saveSpace() {
    if (this.spaces_id) {
      this.refreshShareLink()
        .then(() => this.expanseService.start())
        .then(() => console.log(this.currentApp.share_url))
        .then(() =>
          this.expanseService.updateSpace({
            spaces_id: this.spaces_id,
            name: this.currentApp.name,
            description: this.currentApp.description,
            space_url: this.currentApp.space_url,
            video_url: this.currentApp.video_url,
            image: this.currentApp.image,
            app_url: this.currentApp.app_url,
            share_url: this.currentApp.share_url,
            scenes: this.currentApp.scenes
          })
        )
        .then(res => {
          this.service.showMessage(res, "Space Saved!");
          if (!this.currentApp.is_approved) {
            this.sendForApproval(this.spaces_id);
          }
        });
    } else {
      if (!this.currentApp.name.length) {
        return this.service.showMessage(
          { error: true, data: "Please enter a space name!" },
          ""
        );
      }
      if (!this.currentApp.description.length) {
        return this.service.showMessage(
          { error: true, data: "Please enter a space description!" },
          ""
        );
      }
      if (!this.currentApp.image.length) {
        return this.service.showMessage(
          { error: true, data: "Please select a space image!" },
          ""
        );
      }
      let selectedTemplate = this.spaceTemplates.filter(t => t.selected);
      if (!selectedTemplate.length) {
        return this.service.showMessage(
          { error: true, data: "Please select a space template!" },
          ""
        );
      }
      let scene = new SpaceTemplates().template;
      scene.children[0].settings.url = scene.children[0].settings.sound.url =
        selectedTemplate[0].url;
      scene.settings.space_settings.spawn_point.transform.position =
        selectedTemplate[0].spawn;
      scene.children[0].settings.transform.position =
        selectedTemplate[0].offset;
      scene.settings.uuid = uuidv4();
      scene.children[0].settings.uuid = uuidv4();
      scene.settings.name = this.currentApp.name;
      this.expanseService
        .start()
        .then(() => this.expanseService.saveScene(scene, this.currentApp.name))
        .then((r: any) =>
          this.expanseService.createSpace({
            name: this.currentApp.name,
            description: this.currentApp.description,
            space_url: this.currentApp.space_url,
            video_url: this.currentApp.video_url,
            image: this.currentApp.image,
            app_url: this.currentApp.app_url,
            share_url: this.currentApp.share_url,
            scenes: this.currentApp.scenes,
            default_scenes_id: r.scenes_id
          })
        )
        .then((res: any) => {
          this.service.showMessage(res, "Space Saved!");
          if (!res.error && res.length) {
            this.refreshShareLink();
            this.sendForApproval(res[0].spaces_id).then(() =>
              this.router.navigateByUrl("/my-space/" + res[0].spaces_id)
            );
          }
        });
    }
  }

  sendForApproval(spaces_id) {
    return fetch("https://shanesedit.org:5678/new_space/" + spaces_id);
  }

  deleteSpace() {
    this.expanseService.deleteSpace(this.spaces_id).then(() => {
      return this.router.navigateByUrl("/account");
    });
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
}
