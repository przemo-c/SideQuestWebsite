import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListingComponent } from './event-listing.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppDisplayBoxComponent } from '../app-display-box/app-display-box.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AbbreviateNumberPipe } from '../abbreviate-number.pipe';
import { FormatNumberPipe } from '../format-number.pipe';
import { MzTooltipModule, MzToastModule } from 'ngx-materialize';
import { LightboxModule } from 'ngx-lightbox';

describe('EventListingComponent', () => {
    let component: EventListingComponent;
    let fixture: ComponentFixture<EventListingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, LazyLoadImageModule, MzTooltipModule, MzToastModule, LightboxModule],
            declarations: [EventListingComponent, AppDisplayBoxComponent, FormatNumberPipe, AbbreviateNumberPipe],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventListingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
