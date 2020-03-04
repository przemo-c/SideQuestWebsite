import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GettingStartedInstallSdkComponent } from './getting-started-install-sdk.component';
import { MzToastModule } from 'ngx-materialize';

describe('GettingStartedInstallSdkComponent', () => {
    let component: GettingStartedInstallSdkComponent;
    let fixture: ComponentFixture<GettingStartedInstallSdkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MzToastModule],
            declarations: [GettingStartedInstallSdkComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GettingStartedInstallSdkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
