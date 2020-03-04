import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingModesComponent } from './listing-modes.component';
import { MzToastModule } from 'ngx-materialize';

describe('ListingModesComponent', () => {
    let component: ListingModesComponent;
    let fixture: ComponentFixture<ListingModesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MzToastModule],
            declarations: [ListingModesComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListingModesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
