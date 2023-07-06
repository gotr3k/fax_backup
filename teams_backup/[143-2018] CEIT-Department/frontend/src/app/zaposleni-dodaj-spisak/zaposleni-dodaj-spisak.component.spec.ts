import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniDodajSpisakComponent } from './zaposleni-dodaj-spisak.component';

describe('ZaposleniDodajSpisakComponent', () => {
  let component: ZaposleniDodajSpisakComponent;
  let fixture: ComponentFixture<ZaposleniDodajSpisakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniDodajSpisakComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniDodajSpisakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
