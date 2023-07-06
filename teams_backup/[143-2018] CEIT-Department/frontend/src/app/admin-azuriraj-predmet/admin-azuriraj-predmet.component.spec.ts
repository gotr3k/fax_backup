import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAzurirajPredmetComponent } from './admin-azuriraj-predmet.component';

describe('AdminAzurirajPredmetComponent', () => {
  let component: AdminAzurirajPredmetComponent;
  let fixture: ComponentFixture<AdminAzurirajPredmetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAzurirajPredmetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAzurirajPredmetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
