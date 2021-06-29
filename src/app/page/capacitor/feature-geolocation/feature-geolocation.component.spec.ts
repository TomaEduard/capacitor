import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureGeolocationComponent } from './feature-geolocation.component';

describe('FeatureGeolocationComponent', () => {
  let component: FeatureGeolocationComponent;
  let fixture: ComponentFixture<FeatureGeolocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureGeolocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureGeolocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
