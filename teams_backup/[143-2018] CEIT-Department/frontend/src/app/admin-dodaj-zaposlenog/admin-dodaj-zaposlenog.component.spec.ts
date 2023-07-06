import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDodajZaposlenogComponent } from './admin-dodaj-zaposlenog.component';

describe('AdminDodajZaposlenogComponent', () => {
  let component: AdminDodajZaposlenogComponent;
  let fixture: ComponentFixture<AdminDodajZaposlenogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDodajZaposlenogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDodajZaposlenogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
