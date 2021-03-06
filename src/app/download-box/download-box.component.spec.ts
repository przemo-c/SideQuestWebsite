import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadBoxComponent } from './download-box.component';
import { MzToastModule } from 'ngx-materialize';

describe('DownloadBoxComponent', () => {
    let component: DownloadBoxComponent;
    let fixture: ComponentFixture<DownloadBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MzToastModule],
            declarations: [DownloadBoxComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DownloadBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
