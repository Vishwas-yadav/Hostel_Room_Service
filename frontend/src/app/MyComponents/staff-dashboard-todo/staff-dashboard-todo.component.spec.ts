import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDashboardTodoComponent } from './staff-dashboard-todo.component';

describe('StaffDashboardTodoComponent', () => {
  let component: StaffDashboardTodoComponent;
  let fixture: ComponentFixture<StaffDashboardTodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffDashboardTodoComponent]
    });
    fixture = TestBed.createComponent(StaffDashboardTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
