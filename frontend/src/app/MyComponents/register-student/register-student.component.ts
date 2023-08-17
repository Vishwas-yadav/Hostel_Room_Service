import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/Services/api-service.service';
import { ListenLogedInService } from 'src/app/Services/listen-loged-in.service';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent {
  name: String;
  rollno: String;
  hostelName: String;
  roomno: String;
  email: String;
  password: String;

  wrongName: boolean = false;
  wrongRollno: boolean = false;
  wrongHostelName: boolean = false;
  wrongRoomno: boolean = false;
  wrongEmail: boolean = false;
  wrongPassword: boolean = false;
  constructor(private toastr: ToastrService, private apiService: ApiServiceService,private router: Router) { }


  validateEmail(email: any) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !pattern.test(email))
      return true;
    return false;
  }
  checkPassword(pass: any) {
    let re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(pass);
  }

  registerSubmit = () => {
    let cnt = 0;
    if (!this.name) {
      cnt++;
      this.wrongName = true;
    }
    if (!this.rollno) {
      this.wrongRollno = true;
      cnt++;
    }
    if (!this.hostelName) {
      this.wrongHostelName = true;
      cnt++;

    }
    if (!this.roomno) {
      this.wrongRoomno = true;
      cnt++;

    }
    this.wrongEmail = this.validateEmail(this.email);
    if (this.wrongEmail)
      cnt++;

    if (!this.password || !this.checkPassword(this.password)) {
      this.wrongPassword = true;
      cnt++;

    }
    if (cnt != 0)
      return;

    const reqObj = {
      name: this.name,
      rollNo: this.rollno,
      hostelName: this.hostelName,
      roomNo: this.roomno,
      email: this.email,
      password: this.password,
      role: "student"
    }
    this.registerStudentService(reqObj);

  }
  registerStudentService(obj: any) {
    this.apiService.registerUser(obj).subscribe(
      (res) => {
        this.toastr.success(res.msg);
        this.clearFormFields();
        this.router.navigate(['']);
        // console.log("reee",res.msg);
      },
      (error) => {
        console.log("Error in cmp:", error.error.err);
        this.toastr.error(error.error.err);
      }
    );
  }
  clearFormFields() {
    this.name="";
    this.rollno="";
    this.hostelName="";
    this.roomno="";
    this.email="";
    this.password="";
  }

  clickOnAnyField() {

    this.wrongName = false;
    this.wrongRollno = false;
    this.wrongHostelName = false;
    this.wrongRoomno = false;
    this.wrongEmail = false;
    this.wrongPassword = false;
  }

}
