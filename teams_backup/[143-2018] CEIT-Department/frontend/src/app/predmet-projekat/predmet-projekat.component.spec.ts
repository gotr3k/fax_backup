import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetProjekatComponent } from './predmet-projekat.component';

describe('PredmetProjekatComponent', () => {
  let component: PredmetProjekatComponent;
  let fixture: ComponentFixture<PredmetProjekatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetProjekatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetProjekatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
