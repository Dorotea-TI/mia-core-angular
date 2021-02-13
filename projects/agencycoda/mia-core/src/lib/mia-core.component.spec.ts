import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiaCoreComponent } from './mia-core.component';

describe('MiaCoreComponent', () => {
  let component: MiaCoreComponent;
  let fixture: ComponentFixture<MiaCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiaCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiaCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
