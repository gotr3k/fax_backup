import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetObavestenjaComponent } from './predmet-obavestenja.component';

describe('PredmetObavestenjaComponent', () => {
  let component: PredmetObavestenjaComponent;
  let fixture: ComponentFixture<PredmetObavestenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetObavestenjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetObavestenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
