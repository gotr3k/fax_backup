import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSlusanjaComponent } from './plan-slusanja.component';

describe('PlanSlusanjaComponent', () => {
  let component: PlanSlusanjaComponent;
  let fixture: ComponentFixture<PlanSlusanjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanSlusanjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanSlusanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
