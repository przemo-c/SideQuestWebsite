import { EventEmitter, Injectable } from "@angular/core";
import { ExpanseClientService } from "./expanse-client.service";
import { AvatarPickerComponent } from "./avatar-picker/avatar-picker.component";
import { Router } from "@angular/router";
import { AppService } from "./app.service";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  editorComponent: AvatarPickerComponent;
  is_loading_icon: boolean;
  is_loading_screenshot: boolean;
  constructor(
    private expanseService: ExpanseClientService,
    private router: Router,
    private appService: AppService
  ) {
    this.setupWindowEvents();
  }

  setupWindowEvents() {
    window.addEventListener("message", e => {
      if (e.data.type && e.data.type === "avatarImage") {
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
                    "https://shanesedit.org:5678/new_avatar/" +
                      res[0].avatar_images_id
                  );
                }
              })
              .then(() => this.appService.showMessage({}, "Avatar saved!!"))
              .then(() => this.router.navigateByUrl("/avatar-picker"))
          );
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
}
