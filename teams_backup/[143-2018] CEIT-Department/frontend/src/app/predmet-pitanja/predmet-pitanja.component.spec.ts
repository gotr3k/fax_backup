import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetPitanjaComponent } from './predmet-pitanja.component';

describe('PredmetPitanjaComponent', () => {
  let component: PredmetPitanjaComponent;
  let fixture: ComponentFixture<PredmetPitanjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetPitanjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetPitanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
