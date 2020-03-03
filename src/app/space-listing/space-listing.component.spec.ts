import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceListingComponent } from './space-listing.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MzToastModule } from 'ngx-materialize';
import { LightboxModule } from 'ngx-lightbox';

describe('SpaceListingComponent', () => {
    let component: SpaceListingComponent;
    let fixture: ComponentFixture<SpaceListingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, MzToastModule, LightboxModule],
            declarations: [SpaceListingComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SpaceListingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
