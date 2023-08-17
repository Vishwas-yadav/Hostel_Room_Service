import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './MyComponents/login/login.component';
import { ApplyForServiceComponent } from './Mycomponents/apply-for-service/apply-for-service.component';
import { authGuard, authGuard2, authGuardAdmin, authGuardStaff } from './auth.guard';
import { RegisterStudentComponent } from './Mycomponents/register-student/register-student.component';
import { AdminDashboardComponent } from './Mycomponents/admin-dashboard/admin-dashboard.component';
import { StaffRegistrationComponent } from './Mycomponents/staff-registration/staff-registration.component';
import { StaffDashboardTodoComponent } from './Mycomponents/staff-dashboard-todo/staff-dashboard-todo.component';
const routes: Routes = [
  {path:'',component:LoginComponent,canActivate:[authGuard2]},
  {path:'apply-request',component:ApplyForServiceComponent,canActivate:[authGuard]},
  {path:'register-student',component:RegisterStudentComponent,canActivate:[authGuard2]},
  {path:'admin-dashboard',component:AdminDashboardComponent,canActivate:[authGuardAdmin]},
  {path:'staff-register',component:StaffRegistrationComponent,canActivate:[authGuard2]},
  {path:'staff-dashboard',component:StaffDashboardTodoComponent,canActivate:[authGuardStaff]},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
