import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolingUnitEditComponent } from './pooling-unit-edit.component';

describe('PoolingUnitEditComponent', () => {
  let component: PoolingUnitEditComponent;
  let fixture: ComponentFixture<PoolingUnitEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolingUnitEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolingUnitEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
