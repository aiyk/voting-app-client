import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialEditComponent } from './official-edit.component';

describe('OfficialEditComponent', () => {
  let component: OfficialEditComponent;
  let fixture: ComponentFixture<OfficialEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficialEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
