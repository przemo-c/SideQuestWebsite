import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation
} from "@angular/core";

interface AutocompleteItem {
  id: number;
  name: string;
}

interface GithubRepoSearchResponse {
  items: { name: string }[];
}

@Component({
  selector: "github-repo-select",
  templateUrl: "./github-repo-select.component.html",
  styleUrls: ["./github-repo-select.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class GithubRepoSelectComponent {
  @Input() set user(name: string) {
    this._user = name;
    this.data = [];
    this.searchString = "";
    this.searchReposDelayed(this.user, this.searchString);
  }
  get user(): string {
    return this._user;
  }
  @Input() set repo(name: string) {
    if (name.length > 0) {
      this.searchString = name;
      this.searchReposDelayed(this.user, this.searchString);
    }
  }
  @Output() repoSelected = new EventEmitter<string>();
  @Output() cleared = new EventEmitter<string>();

  public keyword = "name";
  public searchString = "";
  public data: AutocompleteItem[] = [];
  public isLoading = false;

  private debounceTimeout;
  private _user = "";

  public onChangeSearch(searchString: string) {
    this.repoSelected.emit("");
    this.searchReposDelayed(this.user, searchString);
  }
  public onSelectRepo(item: AutocompleteItem) {
    this.repoSelected.emit(item.name);
  }

  private searchReposDelayed(user: string, searchString: string) {
    this.isLoading = true;
    this.debounce(this.searchRepos.bind(this, user, searchString));
  }

  private debounce(fn: () => any) {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(fn, 750);
  }
  // <<<<<<< HEAD
  //     this.isLoading = true;
  //     const url = new URL("https://api.github.com/search/repositories");
  //     const params = new URLSearchParams({
  //       q: `user:${user} ${searchString}`,
  //       sort: "updated",
  //       order: "desc"
  //     });
  //     url.search = params.toString();
  //     const response = await fetch(url.toString());
  //     if (response.ok) {
  //       const repos = (await response.json()) as GithubRepoSearchResponse;
  //       this.data = repos.items.map(({ name }, id) => ({ id, name }));
  // =======

  private async searchRepos(user: string, searchString: string) {
    if (this.user !== user) {
      this.isLoading = false;
      return;
    }
    this.isLoading = true;
    const url = new URL("https://api.github.com/search/repositories");
    const params = new URLSearchParams({
      q: `user:${user} ${searchString}`,
      sort: "updated",
      order: "desc"
    });
    url.search = params.toString();
    const response = await fetch(url.toString());
    if (response.ok) {
      const repos = (await response.json()) as GithubRepoSearchResponse;
      this.data = repos.items.map(({ name }, id) => ({ id, name }));
    }
    this.isLoading = false;
  }
}
