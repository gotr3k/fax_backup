import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniPredmetComponent } from './zaposleni-predmet.component';

describe('ZaposleniPredmetComponent', () => {
  let component: ZaposleniPredmetComponent;
  let fixture: ComponentFixture<ZaposleniPredmetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniPredmetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniPredmetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
