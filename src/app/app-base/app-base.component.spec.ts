import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBaseComponent } from './app-base.component';

describe('AppBaseComponent', () => {
  let component: AppBaseComponent;
  let fixture: ComponentFixture<AppBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
