import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPredmetiComponent } from './admin-predmeti.component';

describe('AdminPredmetiComponent', () => {
  let component: AdminPredmetiComponent;
  let fixture: ComponentFixture<AdminPredmetiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPredmetiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPredmetiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
