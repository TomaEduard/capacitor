import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FereastraSnackbarMultipluComponent } from './fereastra-snackbar-multiplu.component';

describe('FereastraSnackbarMultipluComponent', () => {
  let component: FereastraSnackbarMultipluComponent;
  let fixture: ComponentFixture<FereastraSnackbarMultipluComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FereastraSnackbarMultipluComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FereastraSnackbarMultipluComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
