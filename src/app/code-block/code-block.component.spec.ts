import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeBlockComponent } from './code-block.component';
import { HighlightModule } from 'ngx-highlightjs';
import cs from 'highlight.js/lib/languages/cs';
import { MzToastModule } from 'ngx-materialize';

function hljsLanguages() {
    return [{ name: 'cs', func: cs }];
}

describe('CodeBlockComponent', () => {
    let component: CodeBlockComponent;
    let fixture: ComponentFixture<CodeBlockComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HighlightModule.forRoot({
                    languages: hljsLanguages,
                }),
                MzToastModule,
            ],
            declarations: [CodeBlockComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CodeBlockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
