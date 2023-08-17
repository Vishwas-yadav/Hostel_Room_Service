import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './MyComponents/header/header.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { FormsModule } from '@angular/forms';
import { ApplyForServiceComponent } from './Mycomponents/apply-for-service/apply-for-service.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RegisterStudentComponent } from './Mycomponents/register-student/register-student.component';
import { AdminDashboardComponent } from './Mycomponents/admin-dashboard/admin-dashboard.component';
import { AdminViewAllRequestsComponent } from './Mycomponents/admin-view-all-requests/admin-view-all-requests.component';
import { AdminVerifyStudentsAccountComponent } from './Mycomponents/admin-verify-students-account/admin-verify-students-account.component';
import { StaffRegistrationComponent } from './Mycomponents/staff-registration/staff-registration.component';
import { StaffDashboardTodoComponent } from './Mycomponents/staff-dashboard-todo/staff-dashboard-todo.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ApplyForServiceComponent,
    RegisterStudentComponent,
    AdminDashboardComponent,
    AdminViewAllRequestsComponent,
    AdminVerifyStudentsAccountComponent,
    StaffRegistrationComponent,
    StaffDashboardTodoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
    HttpClientModule 
  ],
  providers: [
    ToastrService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
