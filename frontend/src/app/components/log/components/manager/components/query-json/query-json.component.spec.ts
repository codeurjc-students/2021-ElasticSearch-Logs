import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryJsonComponent } from './query-json.component';

describe('QueryJsonComponent', () => {
  let component: QueryJsonComponent;
  let fixture: ComponentFixture<QueryJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryJsonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
