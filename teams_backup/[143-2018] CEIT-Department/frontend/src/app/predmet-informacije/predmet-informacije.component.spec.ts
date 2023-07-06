import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetInformacijeComponent } from './predmet-informacije.component';

describe('PredmetInformacijeComponent', () => {
  let component: PredmetInformacijeComponent;
  let fixture: ComponentFixture<PredmetInformacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetInformacijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetInformacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
