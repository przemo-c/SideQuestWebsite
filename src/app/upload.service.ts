import { EventEmitter, Injectable } from "@angular/core";
import { ExpanseClientService } from "./expanse-client.service";
import { AvatarPickerComponent } from "./avatar-picker/avatar-picker.component";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AppService } from "./app.service";
import { Subscription } from "rxjs";
declare let gtag;
@Injectable({
  providedIn: "root"
})
export class UploadService {
  editorComponent: AvatarPickerComponent;
  is_loading_icon: boolean;
  is_loading_screenshot: boolean;
  loading: boolean;
  sub: Subscription;
  constructor(
    private expanseService: ExpanseClientService,
    private router: Router,
    private appService: AppService,
    private route: ActivatedRoute
  ) {
    this.setupWindowEvents();
    this.sub = this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        if (this.route.snapshot.children.length) {
          gtag("config", "UA-152732171-1", {
            page_title:
              (<any>this.route.snapshot.children[0].component).name ||
              "Unknown",
            page_path: val.url
          });
        }
      }
    });
  }

  setupWindowEvents() {
    window.addEventListener("message", e => {
      if (e.data.type && e.data.type === "avatarImage") {
        this.loading = true;
        let avatarPreview, avatarImage;
        this.uploadFile(
          e.data.preview,
          "avatar-preview-" + new Date().getTime() + ".jpg"
        )
          .then(res => {
            avatarPreview = res.fileId;
          })
          .then(() =>
            this.uploadFile(
              e.data.image,
              "avatar-texture-" + new Date().getTime() + ".jpg"
            )
          )
          .then(res => {
            avatarImage = res.fileId;
          })
          .then(() =>
            this.expanseService
              .saveAvatarImage(avatarImage, avatarPreview)
              .then((res: any) => {
                if (res.length) {
                  return fetch(
                    this.expanseService.discordURl +
                      "/new_avatar/" +
                      res[0].avatar_images_id
                  );
                }
              })
          )
          .then(() => this.appService.showMessage({}, "Avatar saved!!"))
          .then(() => this.router.navigateByUrl("/avatar-picker"))
          .then(() => (this.loading = false));
      }
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
}
