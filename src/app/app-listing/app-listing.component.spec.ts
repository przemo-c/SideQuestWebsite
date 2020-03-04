import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppListingComponent } from './app-listing.component';
import { AbbreviateNumberPipe } from '../abbreviate-number.pipe';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MzTooltipModule } from 'ngx-materialize';

describe('AppListingComponent', () => {
    let component: AppListingComponent;
    let fixture: ComponentFixture<AppListingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppListingComponent, AbbreviateNumberPipe],
            imports: [LazyLoadImageModule, MzTooltipModule],
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
