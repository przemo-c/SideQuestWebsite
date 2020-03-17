import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptingNetworkingComponent } from './scripting-networking.component';

describe('ScriptingNetworkingComponent', () => {
    let component: ScriptingNetworkingComponent;
    let fixture: ComponentFixture<ScriptingNetworkingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScriptingNetworkingComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScriptingNetworkingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
