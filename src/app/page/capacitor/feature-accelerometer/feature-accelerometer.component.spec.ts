import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureAccelerometerComponent } from './feature-accelerometer.component';

describe('FeatureAccelerometerComponent', () => {
  let component: FeatureAccelerometerComponent;
  let fixture: ComponentFixture<FeatureAccelerometerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureAccelerometerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureAccelerometerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
