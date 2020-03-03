import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDisplayBoxComponent } from './app-display-box.component';
import { AbbreviateNumberPipe } from '../abbreviate-number.pipe';

describe('AppDisplayBoxComponent', () => {
    let component: AppDisplayBoxComponent;
    let fixture: ComponentFixture<AppDisplayBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppDisplayBoxComponent, AbbreviateNumberPipe],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppDisplayBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
