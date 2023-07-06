import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsnovneStudijeComponent } from './osnovne-studije.component';

describe('OsnovneStudijeComponent', () => {
  let component: OsnovneStudijeComponent;
  let fixture: ComponentFixture<OsnovneStudijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsnovneStudijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsnovneStudijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
