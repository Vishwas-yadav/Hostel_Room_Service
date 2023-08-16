import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './MyComponents/login/login.component';
import { ApplyForServiceComponent } from './Mycomponents/apply-for-service/apply-for-service.component';
import { authGuard, authGuard2 } from './auth.guard';
import { RegisterStudentComponent } from './Mycomponents/register-student/register-student.component';
const routes: Routes = [
  {path:'',component:LoginComponent,canActivate:[authGuard2]},
  {path:'apply-request',component:ApplyForServiceComponent,canActivate:[authGuard]},
  {path:'register-student',component:RegisterStudentComponent,canActivate:[authGuard2]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
