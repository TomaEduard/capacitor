import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureNetworkComponent } from './feature-network.component';

describe('FeatureNetworkComponent', () => {
  let component: FeatureNetworkComponent;
  let fixture: ComponentFixture<FeatureNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
