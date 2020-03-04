import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuComponent } from './user-menu.component';
import { NotOverNinePipe } from '../not-over-nine.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { MzToastModule } from 'ngx-materialize';

describe('UserMenuComponent', () => {
    let component: UserMenuComponent;
    let fixture: ComponentFixture<UserMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, MzToastModule],
            declarations: [UserMenuComponent, NotOverNinePipe],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
