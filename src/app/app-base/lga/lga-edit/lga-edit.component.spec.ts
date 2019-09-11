import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LgaEditComponent } from './lga-edit.component';

describe('LgaEditComponent', () => {
  let component: LgaEditComponent;
  let fixture: ComponentFixture<LgaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LgaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LgaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
