import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsobaComponent } from './osoba.component';

describe('OsobaComponent', () => {
  let component: OsobaComponent;
  let fixture: ComponentFixture<OsobaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsobaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsobaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
