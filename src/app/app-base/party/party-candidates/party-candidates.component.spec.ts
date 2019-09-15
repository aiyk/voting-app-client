import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyCandidatesComponent } from './party-candidates.component';

describe('PartyCandidatesComponent', () => {
  let component: PartyCandidatesComponent;
  let fixture: ComponentFixture<PartyCandidatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartyCandidatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartyCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
