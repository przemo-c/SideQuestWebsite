import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MzToastModule } from 'ngx-materialize';

describe('ResetPasswordComponent', () => {
    let component: ResetPasswordComponent;
    let fixture: ComponentFixture<ResetPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule, MzToastModule],
            declarations: [ResetPasswordComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ResetPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
