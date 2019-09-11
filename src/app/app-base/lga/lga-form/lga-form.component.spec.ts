import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LgaFormComponent } from './lga-form.component';

describe('LgaFormComponent', () => {
  let component: LgaFormComponent;
  let fixture: ComponentFixture<LgaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LgaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LgaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
