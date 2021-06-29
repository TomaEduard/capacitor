import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsqrComponent } from './jsqr.component';

describe('JsqrComponent', () => {
  let component: JsqrComponent;
  let fixture: ComponentFixture<JsqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsqrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
