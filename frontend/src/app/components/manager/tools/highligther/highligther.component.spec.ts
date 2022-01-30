import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighligtherComponent } from './highligther.component';

describe('HighligtherComponent', () => {
  let component: HighligtherComponent;
  let fixture: ComponentFixture<HighligtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighligtherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighligtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
