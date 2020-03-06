import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacesComponent } from './spaces.component';
import { FormsModule } from '@angular/forms';
import { ListItemComponent } from '../list-item/list-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MzToastModule } from 'ngx-materialize';

describe('SpacesComponent', () => {
    let component: SpacesComponent;
    let fixture: ComponentFixture<SpacesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule, MzToastModule],
            declarations: [SpacesComponent, ListItemComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SpacesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
