import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaukaComponent } from './nauka.component';

describe('NaukaComponent', () => {
  let component: NaukaComponent;
  let fixture: ComponentFixture<NaukaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaukaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaukaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
