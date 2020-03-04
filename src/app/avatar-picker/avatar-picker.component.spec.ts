import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarPickerComponent } from './avatar-picker.component';
import { MzTooltipModule, MzModalModule, MzButtonModule, MzToastModule } from 'ngx-materialize';
import { OverImageComponent } from '../over-image/over-image.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AvatarPickerComponent', () => {
    let component: AvatarPickerComponent;
    let fixture: ComponentFixture<AvatarPickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MzTooltipModule, MzModalModule, MzButtonModule, MzToastModule, RouterTestingModule],
            declarations: [AvatarPickerComponent, OverImageComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AvatarPickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
