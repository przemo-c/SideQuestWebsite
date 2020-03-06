import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { BannerCarouselComponent } from '../banner-carousel/banner-carousel.component';
import { AppDisplayBoxComponent } from '../app-display-box/app-display-box.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FormatNumberPipe } from '../format-number.pipe';
import { AbbreviateNumberPipe } from '../abbreviate-number.pipe';
import { MzTooltipModule, MzToastModule } from 'ngx-materialize';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [LazyLoadImageModule, MzTooltipModule, MzToastModule, RouterTestingModule],
            declarations: [HomeComponent, BannerCarouselComponent, AppDisplayBoxComponent, FormatNumberPipe, AbbreviateNumberPipe],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
