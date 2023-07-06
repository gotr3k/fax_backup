import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaucniProjektiComponent } from './naucni-projekti.component';

describe('NaucniProjektiComponent', () => {
  let component: NaucniProjektiComponent;
  let fixture: ComponentFixture<NaucniProjektiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaucniProjektiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NaucniProjektiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
