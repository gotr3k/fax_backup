import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniPredmetPitanjaComponent } from './zaposleni-predmet-pitanja.component';

describe('ZaposleniPredmetPitanjaComponent', () => {
  let component: ZaposleniPredmetPitanjaComponent;
  let fixture: ComponentFixture<ZaposleniPredmetPitanjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniPredmetPitanjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniPredmetPitanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
