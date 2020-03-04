import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import { MzTooltipModule, MzModalModule, MzRadioButtonModule, MzButtonModule, MzToastModule } from 'ngx-materialize';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AppDisplayBoxComponent } from '../app-display-box/app-display-box.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FormatNumberPipe } from '../format-number.pipe';
import { AbbreviateNumberPipe } from '../abbreviate-number.pipe';

describe('UserProfileComponent', () => {
    let component: UserProfileComponent;
    let fixture: ComponentFixture<UserProfileComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MzTooltipModule,
                RouterTestingModule,
                MzModalModule,
                FormsModule,
                MzButtonModule,
                MzRadioButtonModule,
                LazyLoadImageModule,
                MzToastModule,
            ],
            declarations: [UserProfileComponent, AppDisplayBoxComponent, FormatNumberPipe, AbbreviateNumberPipe],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
