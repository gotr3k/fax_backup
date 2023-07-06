import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDodajStudentaComponent } from './admin-dodaj-studenta.component';

describe('AdminDodajStudentaComponent', () => {
  let component: AdminDodajStudentaComponent;
  let fixture: ComponentFixture<AdminDodajStudentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDodajStudentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDodajStudentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
