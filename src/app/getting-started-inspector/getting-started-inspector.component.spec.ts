import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GettingStartedInspectorComponent } from './getting-started-inspector.component';
import { MzToastModule } from 'ngx-materialize';

describe('GettingStartedInspectorComponent', () => {
    let component: GettingStartedInspectorComponent;
    let fixture: ComponentFixture<GettingStartedInspectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MzToastModule],
            declarations: [GettingStartedInspectorComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GettingStartedInspectorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
