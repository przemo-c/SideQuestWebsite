import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupHowtoComponent } from './setup-howto.component';
import { DownloadBoxComponent } from '../download-box/download-box.component';
import { LightboxModule } from 'ngx-lightbox';
import { MzToastModule } from 'ngx-materialize';

describe('SetupHowtoComponent', () => {
    let component: SetupHowtoComponent;
    let fixture: ComponentFixture<SetupHowtoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [LightboxModule, MzToastModule],
            declarations: [SetupHowtoComponent, DownloadBoxComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SetupHowtoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
