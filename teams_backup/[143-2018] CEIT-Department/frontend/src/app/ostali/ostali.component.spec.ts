import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OstaliComponent } from './ostali.component';

describe('OstaliComponent', () => {
  let component: OstaliComponent;
  let fixture: ComponentFixture<OstaliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OstaliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OstaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
