import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIsSideQuestComponent } from './what-is-side-quest.component';
import { DownloadBoxComponent } from '../download-box/download-box.component';
import { MzToastModule } from 'ngx-materialize';

describe('WhatIsSideQuestComponent', () => {
    let component: WhatIsSideQuestComponent;
    let fixture: ComponentFixture<WhatIsSideQuestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MzToastModule],
            declarations: [WhatIsSideQuestComponent, DownloadBoxComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WhatIsSideQuestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
