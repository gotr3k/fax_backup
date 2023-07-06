import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetPredavanjaComponent } from './predmet-predavanja.component';

describe('PredmetPredavanjaComponent', () => {
  let component: PredmetPredavanjaComponent;
  let fixture: ComponentFixture<PredmetPredavanjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetPredavanjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetPredavanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
