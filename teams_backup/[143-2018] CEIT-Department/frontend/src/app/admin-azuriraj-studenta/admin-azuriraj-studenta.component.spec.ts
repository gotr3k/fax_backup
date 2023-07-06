import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAzurirajStudentaComponent } from './admin-azuriraj-studenta.component';

describe('AdminAzurirajStudentaComponent', () => {
  let component: AdminAzurirajStudentaComponent;
  let fixture: ComponentFixture<AdminAzurirajStudentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAzurirajStudentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAzurirajStudentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
