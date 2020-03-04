import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptingInputControlsComponent } from './scripting-input-controls.component';
import { CodeBlockComponent } from '../code-block/code-block.component';
import { HighlightModule } from 'ngx-highlightjs';
import cs from 'highlight.js/lib/languages/cs';
import { MzToastModule } from 'ngx-materialize';

function hljsLanguages() {
    return [{ name: 'cs', func: cs }];
}

describe('ScriptingInputControlsComponent', () => {
    let component: ScriptingInputControlsComponent;
    let fixture: ComponentFixture<ScriptingInputControlsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HighlightModule.forRoot({
                    languages: hljsLanguages,
                }),
                MzToastModule,
            ],
            declarations: [ScriptingInputControlsComponent, CodeBlockComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScriptingInputControlsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
