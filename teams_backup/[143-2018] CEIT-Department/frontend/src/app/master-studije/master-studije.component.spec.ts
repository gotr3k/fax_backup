import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterStudijeComponent } from './master-studije.component';

describe('MasterStudijeComponent', () => {
  let component: MasterStudijeComponent;
  let fixture: ComponentFixture<MasterStudijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterStudijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterStudijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
