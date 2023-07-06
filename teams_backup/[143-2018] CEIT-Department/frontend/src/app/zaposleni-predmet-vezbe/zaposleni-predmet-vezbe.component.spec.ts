import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniPredmetVezbeComponent } from './zaposleni-predmet-vezbe.component';

describe('ZaposleniPredmetVezbeComponent', () => {
  let component: ZaposleniPredmetVezbeComponent;
  let fixture: ComponentFixture<ZaposleniPredmetVezbeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniPredmetVezbeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniPredmetVezbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
