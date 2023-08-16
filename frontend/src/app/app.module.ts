import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './MyComponents/header/header.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { FormsModule } from '@angular/forms';
import { ApplyForServiceComponent } from './Mycomponents/apply-for-service/apply-for-service.component';
import { ToastrModule } from 'ngx-toastr';
import { RegisterStudentComponent } from './Mycomponents/register-student/register-student.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ApplyForServiceComponent,
    RegisterStudentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
