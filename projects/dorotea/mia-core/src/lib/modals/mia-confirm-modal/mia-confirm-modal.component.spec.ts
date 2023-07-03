import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiaConfirmModalComponent } from './mia-confirm-modal.component';

describe('MiaConfirmModalComponent', () => {
  let component: MiaConfirmModalComponent;
  let fixture: ComponentFixture<MiaConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiaConfirmModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiaConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
