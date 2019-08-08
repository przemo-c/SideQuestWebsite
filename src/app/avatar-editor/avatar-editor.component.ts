import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { UploadService } from "../upload.service";

@Component({
  selector: "app-avatar-editor",
  templateUrl: "./avatar-editor.component.html",
  styleUrls: ["./avatar-editor.component.css"]
})
export class AvatarEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("editorFrame", { static: true }) editorFrame;
  origin = "http://localhost:4201";
  loadUrl: string;
  sub: Subscription;
  isLoaded: boolean;
  constructor(
    private router: Router,
    route: ActivatedRoute,
    public uploadService: UploadService
  ) {
    this.origin = location.origin;
    this.sub = this.router.events.subscribe(async val => {
      if (val instanceof NavigationEnd) {
        const loadUrl = route.snapshot.paramMap.get("url");
        if (loadUrl) {
          this.loadUrl = decodeURIComponent(loadUrl);
          if (this.isLoaded) {
            this.sendToEditor({ type: "loadAvatarImage", image: this.loadUrl });
          }
        }
      }
    });
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    if (this.loadUrl) {
      this.editorFrame.nativeElement.addEventListener("load", () => {
        this.isLoaded = true;
        this.sendToEditor({ type: "loadAvatarImage", image: this.loadUrl });
      });
    }
  }

  saveAvatar() {
    this.sendToEditor("saveImage");
  }

  pickImage() {
    this.sendToEditor("addImage");
  }

  downloadImage() {
    this.sendToEditor("downloadImage");
  }

  clearImage() {
    this.sendToEditor({
      type: "loadAvatarImage",
      image: "file/240/avatar-image"
    });
  }

  sendToEditor(message) {
    this.editorFrame.nativeElement.contentWindow.postMessage(
      message,
      this.origin
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
