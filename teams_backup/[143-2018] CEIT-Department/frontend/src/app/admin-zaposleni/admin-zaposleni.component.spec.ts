import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminZaposleniComponent } from './admin-zaposleni.component';

describe('AdminZaposleniComponent', () => {
  let component: AdminZaposleniComponent;
  let fixture: ComponentFixture<AdminZaposleniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminZaposleniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminZaposleniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
