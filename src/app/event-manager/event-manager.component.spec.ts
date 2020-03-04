import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManagerComponent } from './event-manager.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StatsChartComponent } from '../stats-chart/stats-chart.component';
import { FormsModule } from '@angular/forms';
import { ShowDurationPipe } from '../show-duration.pipe';
import { MzRadioButtonModule, MzModalModule, MzButtonModule, MzToastModule } from 'ngx-materialize';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ChartsModule } from 'ng2-charts';

describe('EventManagerComponent', () => {
    let component: EventManagerComponent;
    let fixture: ComponentFixture<EventManagerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                FormsModule,
                MzRadioButtonModule,
                MzModalModule,
                NgxDaterangepickerMd.forRoot(),
                MzButtonModule,
                ChartsModule,
                MzToastModule,
            ],
            declarations: [EventManagerComponent, StatsChartComponent, ShowDurationPipe],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventManagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
