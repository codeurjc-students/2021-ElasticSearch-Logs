import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylerComponent } from './styler.component';

describe('StylerComponent', () => {
  let component: StylerComponent;
  let fixture: ComponentFixture<StylerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StylerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StylerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
