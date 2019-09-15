import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterEditComponent } from './voter-edit.component';

describe('VoterEditComponent', () => {
  let component: VoterEditComponent;
  let fixture: ComponentFixture<VoterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
