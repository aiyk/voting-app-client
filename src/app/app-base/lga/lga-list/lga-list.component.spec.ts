import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LgaListComponent } from './lga-list.component';

describe('LgaListComponent', () => {
  let component: LgaListComponent;
  let fixture: ComponentFixture<LgaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LgaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LgaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
