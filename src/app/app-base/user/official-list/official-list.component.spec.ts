import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialListComponent } from './official-list.component';

describe('OfficialListComponent', () => {
  let component: OfficialListComponent;
  let fixture: ComponentFixture<OfficialListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficialListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
