import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnUpdaterComponent } from './column-updater.component';

describe('ColumnUpdaterComponent', () => {
  let component: ColumnUpdaterComponent;
  let fixture: ComponentFixture<ColumnUpdaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnUpdaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
