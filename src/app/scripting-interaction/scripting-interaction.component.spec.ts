import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptingInteractionComponent } from './scripting-interaction.component';
import { CodeBlockComponent } from '../code-block/code-block.component';
import { HighlightModule } from 'ngx-highlightjs';
import cs from 'highlight.js/lib/languages/cs';
import { MzToastModule } from 'ngx-materialize';

function hljsLanguages() {
    return [{ name: 'cs', func: cs }];
}

describe('ScriptingInteractionComponent', () => {
    let component: ScriptingInteractionComponent;
    let fixture: ComponentFixture<ScriptingInteractionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HighlightModule.forRoot({
                    languages: hljsLanguages,
                }),
                MzToastModule,
            ],
            declarations: [ScriptingInteractionComponent, CodeBlockComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScriptingInteractionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
