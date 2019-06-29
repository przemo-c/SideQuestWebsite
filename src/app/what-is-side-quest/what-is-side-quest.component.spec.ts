import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIsSideQuestComponent } from './what-is-side-quest.component';

describe('WhatIsSideQuestComponent', () => {
  let component: WhatIsSideQuestComponent;
  let fixture: ComponentFixture<WhatIsSideQuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatIsSideQuestComponent ]
    })
    .compileComponents();
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
