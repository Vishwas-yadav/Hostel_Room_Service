import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVerifyStudentsAccountComponent } from './admin-verify-students-account.component';

describe('AdminVerifyStudentsAccountComponent', () => {
  let component: AdminVerifyStudentsAccountComponent;
  let fixture: ComponentFixture<AdminVerifyStudentsAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminVerifyStudentsAccountComponent]
    });
    fixture = TestBed.createComponent(AdminVerifyStudentsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
