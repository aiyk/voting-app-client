import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolingUnitFormComponent } from './pooling-unit-form.component';

describe('PoolingUnitFormComponent', () => {
  let component: PoolingUnitFormComponent;
  let fixture: ComponentFixture<PoolingUnitFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolingUnitFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolingUnitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
