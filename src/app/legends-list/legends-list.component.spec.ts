import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendsListComponent } from './legends-list.component';
import { OverImageComponent } from '../over-image/over-image.component';
import { MzToastModule } from 'ngx-materialize';
import { RouterTestingModule } from '@angular/router/testing';

describe('LegendsListComponent', () => {
    let component: LegendsListComponent;
    let fixture: ComponentFixture<LegendsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MzToastModule, RouterTestingModule],
            declarations: [LegendsListComponent, OverImageComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LegendsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
