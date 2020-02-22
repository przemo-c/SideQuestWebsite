import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { AppListing } from "../account/account.component";
import { ExpanseClientService } from "../expanse-client.service";
import { AppService } from "../app.service";
import { NewsItem } from "../home/home.component";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-apps",
  templateUrl: "./apps.component.html",
  styleUrls: ["./apps.component.css"]
})
export class AppsComponent implements OnInit, OnDestroy, AfterViewInit {
  apps: AppListing[] = [];
  searchString: string;
  updateMasonryLayout = false;
  isLoading = false;
  hasNoMore = false;
  page = 0;
  sub: Subscription;
  category: number;
  isLoaded: boolean;
  searchTimeout: any;
  tag: string;
  menuItems = [
    // {
    //   is_main: true,
    //   image: "https://i.imgur.com/tfIhP8C.jpg",
    //   name: "Everything",
    //   description: "All the content on SideQuest",
    //   url: "/apps"
    // },
    {
      is_main: true,
      image:
        "https://the-expanse.github.io/SideQuestRepos/vr-games/icons/vrgames.png",
      name: "All Games & Apps",
      description: "Official VR Games for Go and Quest.",
      url: "/apps/1"
    },
    {
      is_main: false,
      image:
        "https://the-expanse.github.io/SideQuestRepos/vr-games/icons/vrgames.png",
      name: "Puzzle",
      description: "Puzzle Games.",
      url: "/apps/1/puzzle"
    },
    {
      is_main: false,
      image:
        "https://the-expanse.github.io/SideQuestRepos/vr-games/icons/vrgames.png",
      name: "Experience",
      description: "Experiences.",
      url: "/apps/1/experience"
    },
    {
      is_main: false,
      image:
        "https://the-expanse.github.io/SideQuestRepos/vr-games/icons/vrgames.png",
      name: "FPS",
      description: "First Person Shooters.",
      url: "/apps/1/fps"
    },
    {
      is_main: false,
      image:
        "https://the-expanse.github.io/SideQuestRepos/vr-games/icons/vrgames.png",
      name: "Combat",
      description: "Combat Games.",
      url: "/apps/1/combat"
    },
    {
      is_main: false,
      image:
        "https://the-expanse.github.io/SideQuestRepos/vr-games/icons/vrgames.png",
      name: "Climbing",
      description: "Climbing Games.",
      url: "/apps/1/climbing"
    },
    {
      is_main: false,
      image:
        "https://the-expanse.github.io/SideQuestRepos/vr-games/icons/vrgames.png",
      name: "Fitness",
      description: "Fitness Games.",
      url: "/apps/1/fitness"
    },
    {
      is_main: false,
      image:
        "https://the-expanse.github.io/SideQuestRepos/vr-games/icons/vrgames.png",
      name: "Music",
      description: "Music Games.",
      url: "/apps/1/music"
    },
    {
      is_main: false,
      image:
        "https://the-expanse.github.io/SideQuestRepos/vr-games/icons/vrgames.png",
      name: "Horror",
      description: "Horror Games.",
      url: "/apps/1/horror"
    },
    {
      is_main: false,
      image:
        "https://the-expanse.github.io/SideQuestRepos/vr-games/icons/vrgames.png",
      name: "Hand Tracking",
      description: "Put those controllers down!",
      url: "/apps/1/handtracking"
    },
    {
      is_main: false,
      image:
        "https://the-expanse.github.io/SideQuestRepos/vr-games/icons/vrgames.png",
      name: "Educational",
      description: "Educational.",
      url: "/apps/1/education"
    },
    {
      is_main: false,
      image:
        "https://the-expanse.github.io/SideQuestRepos/vr-games/icons/vrgames.png",
      name: "Game Ports",
      description: "Ports of legendary titles.",
      url: "/apps/1/gameport"
    },
    {
      is_main: false,
      image:
        "https://the-expanse.github.io/SideQuestRepos/vr-games/icons/vrgames.png",
      name: "Streaming",
      description: "Steam VR streaming and more.",
      url: "/apps/1/streaming"
    },
    {
      is_main: false,
      image:
        "https://the-expanse.github.io/SideQuestRepos/vr-games/icons/vrgames.png",
      name: "Media Players",
      description: "VR Video Players.",
      url: "/apps/1/media"
    },
    {
      is_main: false,
      image:
        "https://the-expanse.github.io/SideQuestRepos/vr-games/icons/vrgames.png",
      name: "Collaborative",
      description: "Collaborative.",
      url: "/apps/1/collaborative"
    },
    {
      is_main: false,
      image:
        "https://the-expanse.github.io/SideQuestRepos/vr-games/icons/vrgames.png",
      name: "Launchers",
      description: "Launchers.",
      url: "/apps/1/launcher"
    },
    // What am i going to do about NSFW ??
    // disable the category menu and add an 18+ warning when entering.
    // {
    //   is_main: false,
    //   image: "https://the-expanse.github.io/SideQuestRepos/nsfw/icons/nsfw.png",
    //   name: "NSFW",
    //   description: "NSFW.",
    //   url: "/apps/3"
    // },
    {
      is_main: true,
      image:
        "https://the-expanse.github.io/SideQuestRepos/android-games/icons/games.png",
      name: "All Mods",
      description: "All Mods.",
      url: "/apps/4"
    },
    {
      is_main: false,
      image:
        "https://the-expanse.github.io/SideQuestRepos/android-games/icons/games.png",
      name: "SynthRiders",
      description: "SynthRiders.",
      url: "/apps/4/srstage"
    },
    {
      is_main: false,
      image:
        "https://the-expanse.github.io/SideQuestRepos/android-games/icons/games.png",
      name: "BMBF",
      description: "BMBF.",
      url: "/apps/4/beaton"
    },
    {
      is_main: false,
      image:
        "https://the-expanse.github.io/SideQuestRepos/android-games/icons/games.png",
      name: "Firefox Reality",
      description: "Firefox Reality.",
      url: "/apps/4/firefox"
    }
  ];
  searchTags: Materialize.AutoCompleteOptions;
  autocompleteOptions: Materialize.AutoCompleteOptions = {
    data: {
      Apple: null,
      Microsoft: null,
      Google: "assets/google_g_logo.png"
    }
  };
  order: string;
  constructor(
    public expanseService: ExpanseClientService,
    public appService: AppService,
    public router: Router,
    route: ActivatedRoute
  ) {
    this.sub = this.router.events.subscribe(async val => {
      if (val instanceof NavigationEnd) {
        this.category = Number(route.snapshot.paramMap.get("category"));
        if (!Number.isInteger(this.category)) {
          this.category = null;
        }
        this.tag = route.snapshot.paramMap.get("tag");
        if (this.tag === "none") {
          this.tag = null;
        }
        this.page = Number(route.snapshot.paramMap.get("page"));
        if (!Number.isInteger(this.page)) {
          this.page = 0;
        }
        let orders = ["downloads", "rating", "created", "latest", "name"];
        this.order = route.snapshot.paramMap.get("order") || "rating";
        if (!~orders.indexOf(this.order)) {
          this.order = "rating";
        }
        if (this.isLoaded) {
          this.getApps();
        }
      }
    });
    this.searchTags = {
      data: {
        Apple: null,
        Microsoft: null,
        Google: null
      }
    };
  }

  debounceSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.page = 0;
      this.getApps();
    }, 750);
  }

  ngOnInit() {
    return this.getApps();
  }

  ngAfterViewInit() {}
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  backClicked() {
    (window as any).history.back();
  }
  isDesc() {}
  getApps() {
    this.isLoading = true;
    this.expanseService.start().then(() =>
      this.expanseService
        .searchApps(
          this.searchString,
          this.page,
          this.order,
          this.order === "name" ? "asc" : "desc",
          this.category,
          this.tag,
          null,
          21
        )
        .then(async (resp: AppListing[]) => {
          // this.appService.fixImages(resp, 512);
          this.hasNoMore = resp.length < 21;
          // let isGrid = this.appService.isGrid;
          if (this.page === 0) {
            // this.appService.isGrid = false;
            this.apps.length = 0;
          }
          this.isLoading = false;
          this.apps = resp; // this.apps.concat(resp);
          this.apps.forEach((d: AppListing, i) => {
            const date = new Date(+d.created);
            d.date_string =
              date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
            d.show_date =
              i === 0 || this.apps[i - 1].date_string !== d.date_string;
          });
          // this.updateMasonryLayout = true;
          this.isLoaded = true;
          // if (this.page === 0) {
          //   setTimeout(() => {
          //     this.appService.isGrid = isGrid;
          //     setTimeout(() => {
          //       this.updateMasonryLayout = true;
          //     }, 250);
          //   });
          // }

          resp.forEach(app => {
            this.appService.app_index[app.apps_id] = app.packagename;
          });
          this.appService.saveAppMeta();
        })
    );
  }

  tryGetApps() {
    if (this.page === 0) {
      this.getApps();
    }
  }

  onAdd() {}
  onDelete() {}
  onSelect() {}
}
