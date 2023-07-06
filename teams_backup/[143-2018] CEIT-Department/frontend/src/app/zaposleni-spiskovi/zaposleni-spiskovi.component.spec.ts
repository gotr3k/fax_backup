import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniSpiskoviComponent } from './zaposleni-spiskovi.component';

describe('ZaposleniSpiskoviComponent', () => {
  let component: ZaposleniSpiskoviComponent;
  let fixture: ComponentFixture<ZaposleniSpiskoviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniSpiskoviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniSpiskoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
