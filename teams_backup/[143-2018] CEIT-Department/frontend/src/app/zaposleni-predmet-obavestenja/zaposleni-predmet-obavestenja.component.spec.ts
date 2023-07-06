import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniPredmetObavestenjaComponent } from './zaposleni-predmet-obavestenja.component';

describe('ZaposleniPredmetObavestenjaComponent', () => {
  let component: ZaposleniPredmetObavestenjaComponent;
  let fixture: ComponentFixture<ZaposleniPredmetObavestenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniPredmetObavestenjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniPredmetObavestenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
