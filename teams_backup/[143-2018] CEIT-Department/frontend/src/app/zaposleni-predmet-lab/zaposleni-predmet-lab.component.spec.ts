import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniPredmetLabComponent } from './zaposleni-predmet-lab.component';

describe('ZaposleniPredmetLabComponent', () => {
  let component: ZaposleniPredmetLabComponent;
  let fixture: ComponentFixture<ZaposleniPredmetLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniPredmetLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniPredmetLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
