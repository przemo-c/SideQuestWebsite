import { Component } from '@angular/core';
import { AppListing } from '../account/account.component';
import { AppsToUpdateService } from '../apps-to-update.service';

@Component({
    selector: 'updates-count',
    templateUrl: './updates-count.component.html',
    styleUrls: ['./updates-count.component.css'],
})
export class UpdatesCountComponent {
    appsToUpdateCount: number = 0;

    constructor(private appsToUpdateService: AppsToUpdateService) {
        this.appsToUpdateService.appsToUpdate.subscribe((apps: AppListing[]) => {
            this.appsToUpdateCount = apps.length;
        });
    }
}
