import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajObavestenjeComponent } from './dodaj-obavestenje.component';

describe('DodajObavestenjeComponent', () => {
  let component: DodajObavestenjeComponent;
  let fixture: ComponentFixture<DodajObavestenjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajObavestenjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DodajObavestenjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
