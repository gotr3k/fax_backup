import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAngazovanjaComponent } from './plan-angazovanja.component';

describe('PlanAngazovanjaComponent', () => {
  let component: PlanAngazovanjaComponent;
  let fixture: ComponentFixture<PlanAngazovanjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanAngazovanjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanAngazovanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
