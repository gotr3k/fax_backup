import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetLabComponent } from './predmet-lab.component';

describe('PredmetLabComponent', () => {
  let component: PredmetLabComponent;
  let fixture: ComponentFixture<PredmetLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
