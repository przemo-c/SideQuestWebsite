import { Component, OnInit } from "@angular/core";
import { ExpanseClientService } from "../expanse-client.service";
import { AppService } from "../app.service";
import { Router } from "@angular/router";
interface Legend {
  avatar_images_id: number;
  banner_image: string;
  bio: string;
  created: string;
  default_space: string;
  donate_url: string;
  image: string;
  name: string;
  preview_image: string;
  profile_color: string;
  score_points: string;
  tag_line: string;
  users_id: number;
}
@Component({
  selector: "app-legends-list",
  templateUrl: "./legends-list.component.html",
  styleUrls: ["./legends-list.component.css"]
})
export class LegendsListComponent implements OnInit {
  legends: Legend[];
  isLoading: boolean;
  constructor(
    private expanseService: ExpanseClientService,
    public appService: AppService,
    public router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.expanseService
      .start()
      .then(() => this.expanseService.getLegends())
      .then((res: Legend[]) => {
        this.legends = res;
        this.legends.forEach(
          l =>
            (l.banner_image =
              l.banner_image || "https://i.imgur.com/v90ezRG.png")
        );
        this.isLoading = false;
      });
  }
}
