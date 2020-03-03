import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptingIntroductionComponent } from './scripting-introduction.component';
import { CodeBlockComponent } from '../code-block/code-block.component';
import { HighlightModule } from 'ngx-highlightjs';
import cs from 'highlight.js/lib/languages/cs';
import { MzToastModule } from 'ngx-materialize';

function hljsLanguages() {
    return [{ name: 'cs', func: cs }];
}

describe('ScriptingIntroductionComponent', () => {
    let component: ScriptingIntroductionComponent;
    let fixture: ComponentFixture<ScriptingIntroductionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HighlightModule.forRoot({
                    languages: hljsLanguages,
                }),
                MzToastModule,
            ],
            declarations: [ScriptingIntroductionComponent, CodeBlockComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScriptingIntroductionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
