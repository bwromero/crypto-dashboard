import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoInputFieldComponent } from './crypto-input-field.component';

describe('CryptoInputFieldComponent', () => {
  let component: CryptoInputFieldComponent;
  let fixture: ComponentFixture<CryptoInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoInputFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
