import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcijeComponent } from './opcije.component';

describe('OpcijeComponent', () => {
  let component: OpcijeComponent;
  let fixture: ComponentFixture<OpcijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcijeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
