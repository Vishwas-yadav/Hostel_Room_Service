import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewAllRequestsComponent } from './admin-view-all-requests.component';

describe('AdminViewAllRequestsComponent', () => {
  let component: AdminViewAllRequestsComponent;
  let fixture: ComponentFixture<AdminViewAllRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminViewAllRequestsComponent]
    });
    fixture = TestBed.createComponent(AdminViewAllRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
