import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveawayComponent } from './giveaway.component';
import { MzToastModule } from 'ngx-materialize';

describe('GiveawayComponent', () => {
    let component: GiveawayComponent;
    let fixture: ComponentFixture<GiveawayComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MzToastModule],
            declarations: [GiveawayComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GiveawayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
