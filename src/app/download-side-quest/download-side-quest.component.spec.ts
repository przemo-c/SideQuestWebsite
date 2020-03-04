import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadSideQuestComponent } from './download-side-quest.component';
import { FromNowPipe } from '../from-now.pipe';
import { DownloadBoxComponent } from '../download-box/download-box.component';
import { MzToastModule } from 'ngx-materialize';

describe('DownloadSideQuestComponent', () => {
    let component: DownloadSideQuestComponent;
    let fixture: ComponentFixture<DownloadSideQuestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MzToastModule],
            declarations: [DownloadSideQuestComponent, FromNowPipe, DownloadBoxComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DownloadSideQuestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
