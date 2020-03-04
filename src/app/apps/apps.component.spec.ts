import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppsComponent } from './apps.component';
import { MzSidenavModule, MzTooltipModule, MzToastModule } from 'ngx-materialize';
import { RouterTestingModule } from '@angular/router/testing';
import { AppDisplayBoxComponent } from '../app-display-box/app-display-box.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ChartsModule } from 'ng2-charts';
import { StatsChartComponent } from '../stats-chart/stats-chart.component';
import { FormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FormatNumberPipe } from '../format-number.pipe';
import { AbbreviateNumberPipe } from '../abbreviate-number.pipe';

describe('AppsComponent', () => {
    let component: AppsComponent;
    let fixture: ComponentFixture<AppsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MzSidenavModule,
                MzTooltipModule,
                RouterTestingModule,
                NgxDaterangepickerMd.forRoot(),
                ChartsModule,
                FormsModule,
                LazyLoadImageModule,
                MzToastModule,
            ],
            declarations: [AppsComponent, AppDisplayBoxComponent, StatsChartComponent, FormatNumberPipe, AbbreviateNumberPipe],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
