import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppListingComponent } from './app-listing.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MzTooltipModule, MzModalModule, MzButtonModule, MzToastModule } from 'ngx-materialize';
import { RouterTestingModule } from '@angular/router/testing';
import { FromNowPipe } from '../from-now.pipe';
import { EncodeUriPipe } from '../encode-uri.pipe';
import { RecaptchaModule } from 'ng-recaptcha';
import { FormsModule } from '@angular/forms';
import { LightboxModule } from 'ngx-lightbox';

describe('AppListingComponent', () => {
    let component: AppListingComponent;
    let fixture: ComponentFixture<AppListingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                LazyLoadImageModule,
                MzTooltipModule,
                MzModalModule,
                RecaptchaModule,
                FormsModule,
                MzButtonModule,
                MzToastModule,
                LightboxModule,
            ],
            declarations: [AppListingComponent, FromNowPipe, EncodeUriPipe],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppListingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
