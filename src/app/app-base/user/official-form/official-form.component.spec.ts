import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialFormComponent } from './official-form.component';

describe('OfficialFormComponent', () => {
  let component: OfficialFormComponent;
  let fixture: ComponentFixture<OfficialFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficialFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
