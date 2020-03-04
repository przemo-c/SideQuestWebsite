import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsComponent } from './events.component';
import { FormsModule } from '@angular/forms';
import { TimelineItemComponent } from '../timeline-item/timeline-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MzToastModule } from 'ngx-materialize';

describe('EventsComponent', () => {
    let component: EventsComponent;
    let fixture: ComponentFixture<EventsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule, MzToastModule],
            declarations: [EventsComponent, TimelineItemComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
