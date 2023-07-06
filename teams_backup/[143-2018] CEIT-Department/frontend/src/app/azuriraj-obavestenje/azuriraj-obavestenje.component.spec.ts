import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajObavestenjeComponent } from './azuriraj-obavestenje.component';

describe('AzurirajObavestenjeComponent', () => {
  let component: AzurirajObavestenjeComponent;
  let fixture: ComponentFixture<AzurirajObavestenjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajObavestenjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurirajObavestenjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
