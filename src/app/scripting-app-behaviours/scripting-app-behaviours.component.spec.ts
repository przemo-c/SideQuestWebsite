import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptingAppBehavioursComponent } from './scripting-app-behaviours.component';
import { CodeBlockComponent } from '../code-block/code-block.component';
import { HighlightModule } from 'ngx-highlightjs';
import cs from 'highlight.js/lib/languages/cs';
import { MzToastModule } from 'ngx-materialize';

function hljsLanguages() {
    return [{ name: 'cs', func: cs }];
}

describe('ScriptingAppBehavioursComponent', () => {
    let component: ScriptingAppBehavioursComponent;
    let fixture: ComponentFixture<ScriptingAppBehavioursComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HighlightModule.forRoot({
                    languages: hljsLanguages,
                }),
                MzToastModule,
            ],
            declarations: [ScriptingAppBehavioursComponent, CodeBlockComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScriptingAppBehavioursComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
