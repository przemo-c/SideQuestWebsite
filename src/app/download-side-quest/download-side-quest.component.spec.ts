import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadSideQuestComponent } from './download-side-quest.component';

describe('DownloadSideQuestComponent', () => {
  let component: DownloadSideQuestComponent;
  let fixture: ComponentFixture<DownloadSideQuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadSideQuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadSideQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
