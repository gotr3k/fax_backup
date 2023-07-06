import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetVezbeComponent } from './predmet-vezbe.component';

describe('PredmetVezbeComponent', () => {
  let component: PredmetVezbeComponent;
  let fixture: ComponentFixture<PredmetVezbeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetVezbeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetVezbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
