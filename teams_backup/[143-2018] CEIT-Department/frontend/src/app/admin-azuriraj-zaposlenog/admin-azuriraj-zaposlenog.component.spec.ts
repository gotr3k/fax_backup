import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAzurirajZaposlenogComponent } from './admin-azuriraj-zaposlenog.component';

describe('AdminAzurirajZaposlenogComponent', () => {
  let component: AdminAzurirajZaposlenogComponent;
  let fixture: ComponentFixture<AdminAzurirajZaposlenogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAzurirajZaposlenogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAzurirajZaposlenogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
