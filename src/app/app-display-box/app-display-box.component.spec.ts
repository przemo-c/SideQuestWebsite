import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDisplayBoxComponent } from './app-display-box.component';
import { AbbreviateNumberPipe } from '../abbreviate-number.pipe';
import { FormatNumberPipe } from '../format-number.pipe';
import { MzTooltipModule } from 'ngx-materialize';
import { LazyLoadImageModule } from 'ng-lazyload-image';

describe('AppDisplayBoxComponent', () => {
    let component: AppDisplayBoxComponent;
    let fixture: ComponentFixture<AppDisplayBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppDisplayBoxComponent, AbbreviateNumberPipe, FormatNumberPipe],
            imports: [LazyLoadImageModule, MzTooltipModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppDisplayBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
