import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniAzurirajPredmetnoObavestenjeComponent } from './zaposleni-azuriraj-predmetno-obavestenje.component';

describe('ZaposleniAzurirajPredmetnoObavestenjeComponent', () => {
  let component: ZaposleniAzurirajPredmetnoObavestenjeComponent;
  let fixture: ComponentFixture<ZaposleniAzurirajPredmetnoObavestenjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniAzurirajPredmetnoObavestenjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniAzurirajPredmetnoObavestenjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
