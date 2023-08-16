import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyForServiceComponent } from './apply-for-service.component';

describe('ApplyForServiceComponent', () => {
  let component: ApplyForServiceComponent;
  let fixture: ComponentFixture<ApplyForServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyForServiceComponent]
    });
    fixture = TestBed.createComponent(ApplyForServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
