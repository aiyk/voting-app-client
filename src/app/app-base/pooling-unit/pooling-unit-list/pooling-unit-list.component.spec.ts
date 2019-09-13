import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolingUnitListComponent } from './pooling-unit-list.component';

describe('PoolingUnitListComponent', () => {
  let component: PoolingUnitListComponent;
  let fixture: ComponentFixture<PoolingUnitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoolingUnitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolingUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
