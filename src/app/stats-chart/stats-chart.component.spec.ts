import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsChartComponent } from './stats-chart.component';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd, LocaleService } from 'ngx-daterangepicker-material';
import { ChartsModule } from 'ng2-charts';
import { MzToastModule } from 'ngx-materialize';

describe('StatsChartComponent', () => {
    let component: StatsChartComponent;
    let fixture: ComponentFixture<StatsChartComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ChartsModule, MzToastModule, NgxDaterangepickerMd.forRoot()],
            declarations: [StatsChartComponent],
            providers: [LocaleService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StatsChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
