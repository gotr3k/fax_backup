import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniPredmetOComponent } from './zaposleni-predmet-o.component';

describe('ZaposleniPredmetOComponent', () => {
  let component: ZaposleniPredmetOComponent;
  let fixture: ComponentFixture<ZaposleniPredmetOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniPredmetOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniPredmetOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
