import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDodajPredmetComponent } from './admin-dodaj-predmet.component';

describe('AdminDodajPredmetComponent', () => {
  let component: AdminDodajPredmetComponent;
  let fixture: ComponentFixture<AdminDodajPredmetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDodajPredmetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDodajPredmetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
