import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebVRComponent } from './web-vr.component';
import { FormsModule } from '@angular/forms';
import { AppDisplayBoxComponent } from '../app-display-box/app-display-box.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FormatNumberPipe } from '../format-number.pipe';
import { AbbreviateNumberPipe } from '../abbreviate-number.pipe';
import { MzTooltipModule, MzToastModule } from 'ngx-materialize';
import { RouterTestingModule } from '@angular/router/testing';

describe('WebVRComponent', () => {
    let component: WebVRComponent;
    let fixture: ComponentFixture<WebVRComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, LazyLoadImageModule, MzTooltipModule, MzToastModule, RouterTestingModule],
            declarations: [WebVRComponent, AppDisplayBoxComponent, FormatNumberPipe, AbbreviateNumberPipe],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WebVRComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
