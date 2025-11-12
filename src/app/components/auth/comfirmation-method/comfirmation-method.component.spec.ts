import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfirmationMethodComponent } from './comfirmation-method.component';

describe('ComfirmationMethodComponent', () => {
  let component: ComfirmationMethodComponent;
  let fixture: ComponentFixture<ComfirmationMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComfirmationMethodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComfirmationMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
