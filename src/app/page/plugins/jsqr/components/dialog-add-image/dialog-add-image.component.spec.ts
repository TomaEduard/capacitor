import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddImageComponent } from './dialog-add-image.component';

describe('DialogAddImageComponent', () => {
  let component: DialogAddImageComponent;
  let fixture: ComponentFixture<DialogAddImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
