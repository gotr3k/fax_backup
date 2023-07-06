import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniPredmetiComponent } from './zaposleni-predmeti.component';

describe('ZaposleniPredmetiComponent', () => {
  let component: ZaposleniPredmetiComponent;
  let fixture: ComponentFixture<ZaposleniPredmetiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniPredmetiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniPredmetiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
