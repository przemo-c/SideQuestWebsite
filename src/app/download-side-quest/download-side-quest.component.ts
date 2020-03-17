import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ExpanseClientService } from '../expanse-client.service';

@Component({
    selector: 'app-download-side-quest',
    templateUrl: './download-side-quest.component.html',
    styleUrls: ['./download-side-quest.component.css'],
})
export class DownloadSideQuestComponent implements OnInit {
    total_downloads: number;
    total_downloads_sidequest: number;
    sideQuestApps: any = [];
    last_updated_at;
    constructor(public appService: AppService, public expanseService: ExpanseClientService) {}

    openUrl(url: string) {
        window.open(url);
    }
    ngOnInit() {
        fetch('https://api.github.com/repos/The-expanse/SideQuest/releases')
            .then(r => r.json())
            .then(r =>
                r.reduce((a, b) => {
                    a += b.assets.reduce((_a, _b) => {
                        if (_b.name.indexOf('latest') === -1 && _b.name.indexOf('blockmap') === -1) {
                            _a += _b.download_count;
                        }
                        return _a;
                    }, 0);
                    return a;
                }, 0)
            )
            .then(
                total =>
                    (this.total_downloads_sidequest = total + 46780)
                    /*Rather than make another paginated call to the releases api, just adding the total before X date*/
            )
            .then(() => fetch('https://api.github.com/repos/the-expanse/ExpanseReleases/releases/latest'))
            .then(r => r.json())
            .then(r => {
                return r.assets.filter(a => {
                    const ext = a.name.split('.').pop();
                    return ext === 'apk' || ext === 'exe';
                });
            })
            .then(r => (this.sideQuestApps = r))
            .then(() => fetch('https://api.github.com/repos/the-expanse/ExpanseReleases/releases'))
            .then(r => r.json())
            .then(r =>
                r.reduce((a, b) => {
                    a += b.assets.reduce((_a, _b) => {
                        if (_b.name.indexOf('latest') === -1 && _b.name.indexOf('blockmap') === -1) {
                            _a += _b.download_count;
                        }
                        return _a;
                    }, 0);
                    return a;
                }, 0)
            )
            .then(total => (this.total_downloads = total));
    }

    subscribeToApp(url) {
        if (this.appService.isAuthenticated || this.appService.hideLogo) {
            this.appService.remoteInstall({
                app_urls: [{ link_url: url, provider: 'APK' }],
                website: '',
                app_categories_id: 1,
            });
            this.appService.showMessage({ error: false }, 'Installing...');
        } else {
            this.appService.showMessage({ error: false }, 'Sending to SideQuest...');
        }

        // : Promise.resolve().then(() => {
        //   if (this.apk_download_urls && this.apk_download_urls.length) {
        //     this.service.remoteInstall({
        //       app_urls: this.apk_download_urls,
        //       website: this.currentApp.website,
        //       app_categories_id: this.currentApp.app_categories_id
        //     });
        //     this.service.showMessage(
        //       { error: false },
        //       this.service.hideLogo
        //         ? "Installing..."
        //         : "Sending to SideQuest Locally..."
        //     );
        //   }
        // });
    }
}
