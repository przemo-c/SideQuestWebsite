import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppManagerComponent } from './app-manager.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StatsChartComponent } from '../stats-chart/stats-chart.component';
import { FormsModule } from '@angular/forms';
import {
    MzChipModule,
    MzRadioButtonModule,
    MzSwitchModule,
    MzModalModule,
    MzButtonModule,
    MzTextareaModule,
    MzToastModule,
} from 'ngx-materialize';
import { GithubRepoSelectComponent } from '../github-repo-select/github-repo-select.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ChartsModule } from 'ng2-charts';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CommonModule } from '@angular/common';

describe('AppManagerComponent', () => {
    let component: AppManagerComponent;
    let fixture: ComponentFixture<AppManagerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                RouterTestingModule,
                FormsModule,
                MzChipModule,
                MzRadioButtonModule,
                MzSwitchModule,
                MzModalModule,
                MzButtonModule,
                MzTextareaModule,
                NgxDaterangepickerMd,
                ChartsModule,
                AutocompleteLibModule,
                MzToastModule,
            ],
            declarations: [AppManagerComponent, StatsChartComponent, GithubRepoSelectComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppManagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
