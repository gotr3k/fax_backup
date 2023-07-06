import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniPredmetPredavanjaComponent } from './zaposleni-predmet-predavanja.component';

describe('ZaposleniPredmetPredavanjaComponent', () => {
  let component: ZaposleniPredmetPredavanjaComponent;
  let fixture: ComponentFixture<ZaposleniPredmetPredavanjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniPredmetPredavanjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniPredmetPredavanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
