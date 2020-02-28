import { Subject } from 'rxjs';
import { Injectable, APP_INITIALIZER } from "@angular/core";
import { ExpanseClientService } from "./expanse-client.service";
import { AppListing } from "./account/account.component";

@Injectable({
  providedIn: "root"
})
export class AppsToUpdateService {
    public static initProvider = {
        provide: APP_INITIALIZER,
        useFactory: (service: AppsToUpdateService) => () => service.init(),
        deps: [AppsToUpdateService],
        multi: true
    };

    public appsToUpdate = new Subject<AppListing[]>();
    
    constructor(
        private expanseService: ExpanseClientService
    ) {
        this.expanseService.installedAppsChangedAt.subscribe((_timestamp: number) => {
            this.updateAppList();
        });
    }

    public init() {
        this.updateAppList();
    }

    private async updateAppList() {
        this.appsToUpdate.next(await this.getAppsToUpdate());
    }

    private async getAppsToUpdate(): Promise<AppListing[]> {
        await this.expanseService.start();
        const list: AppListing[] = [];
        let hasMore = true;
        let page = 0;
        while (hasMore) {
            const pageList = await this.getAppsToUpdatePage(page);
            list.push(...pageList);
            hasMore = pageList.length > 0;
            page += 1;
        }
        return list;
    }

    private async getAppsToUpdatePage(page: number): Promise<AppListing[]> {
        const needsUpdate = (app: AppListing) => app.versioncode > app.current_version;
        const isNotAMod = (app: AppListing) => !(app.app_categories_id === "4" && app.website === "BeatOn");
        const allApps = (await this.expanseService.searchInstalledApps('', page, true, false)) as AppListing[];
        const needToUpdateApps = allApps.filter(needsUpdate).filter(isNotAMod);
        return needToUpdateApps;
    }
}
