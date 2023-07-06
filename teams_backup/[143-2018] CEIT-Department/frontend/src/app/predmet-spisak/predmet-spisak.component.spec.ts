import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetSpisakComponent } from './predmet-spisak.component';

describe('PredmetSpisakComponent', () => {
  let component: PredmetSpisakComponent;
  let fixture: ComponentFixture<PredmetSpisakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetSpisakComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetSpisakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
