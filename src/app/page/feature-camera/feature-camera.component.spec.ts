import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCameraComponent } from './feature-camera.component';

describe('FeatureCameraComponent', () => {
  let component: FeatureCameraComponent;
  let fixture: ComponentFixture<FeatureCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureCameraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
