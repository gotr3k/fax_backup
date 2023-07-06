import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniPredmetProjekatComponent } from './zaposleni-predmet-projekat.component';

describe('ZaposleniPredmetProjekatComponent', () => {
  let component: ZaposleniPredmetProjekatComponent;
  let fixture: ComponentFixture<ZaposleniPredmetProjekatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniPredmetProjekatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniPredmetProjekatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
