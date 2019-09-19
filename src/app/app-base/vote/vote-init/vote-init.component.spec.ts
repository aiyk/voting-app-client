import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteInitComponent } from './vote-init.component';

describe('VoteInitComponent', () => {
  let component: VoteInitComponent;
  let fixture: ComponentFixture<VoteInitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteInitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteInitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
