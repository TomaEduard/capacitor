import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureFileSystemComponent } from './feature-file-system.component';

describe('FeatureFileSystemComponent', () => {
  let component: FeatureFileSystemComponent;
  let fixture: ComponentFixture<FeatureFileSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureFileSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureFileSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
