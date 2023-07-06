import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniProfilComponent } from './zaposleni-profil.component';

describe('ZaposleniProfilComponent', () => {
  let component: ZaposleniProfilComponent;
  let fixture: ComponentFixture<ZaposleniProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniProfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
