import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatsDialogsComponent } from './formats-dialogs.component';

describe('FormatsDialogsComponent', () => {
  let component: FormatsDialogsComponent;
  let fixture: ComponentFixture<FormatsDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormatsDialogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatsDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
