import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeShortcutsComponent } from './time-shortcuts.component';

describe('TimeShortcutsComponent', () => {
  let component: TimeShortcutsComponent;
  let fixture: ComponentFixture<TimeShortcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeShortcutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
