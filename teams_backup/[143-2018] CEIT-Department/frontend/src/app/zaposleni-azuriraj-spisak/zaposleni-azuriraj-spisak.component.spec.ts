import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniAzurirajSpisakComponent } from './zaposleni-azuriraj-spisak.component';

describe('ZaposleniAzurirajSpisakComponent', () => {
  let component: ZaposleniAzurirajSpisakComponent;
  let fixture: ComponentFixture<ZaposleniAzurirajSpisakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniAzurirajSpisakComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniAzurirajSpisakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
