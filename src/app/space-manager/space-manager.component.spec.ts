import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceManagerComponent } from './space-manager.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StatsChartComponent } from '../stats-chart/stats-chart.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { SpaceTemplateItemComponent } from '../space-template-item/space-template-item.component';
import { MzModalModule, MzButtonModule, MzToastModule } from 'ngx-materialize';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

describe('SpaceManagerComponent', () => {
    let component: SpaceManagerComponent;
    let fixture: ComponentFixture<SpaceManagerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                ChartsModule,
                FormsModule,
                MzModalModule,
                MzButtonModule,
                NgxDaterangepickerMd,
                MzToastModule,
            ],
            declarations: [SpaceManagerComponent, StatsChartComponent, SpaceTemplateItemComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SpaceManagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
