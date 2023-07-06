import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniDodajPredmetnoObavestenjeComponent } from './zaposleni-dodaj-predmetno-obavestenje.component';

describe('ZaposleniDodajPredmetnoObavestenjeComponent', () => {
  let component: ZaposleniDodajPredmetnoObavestenjeComponent;
  let fixture: ComponentFixture<ZaposleniDodajPredmetnoObavestenjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniDodajPredmetnoObavestenjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniDodajPredmetnoObavestenjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
