import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ListenLogedInService } from 'src/app/Services/listen-loged-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: String;
  password: String;
  wrongEmail: boolean = false;
  wrongPassword: boolean = false;

  constructor(private router: Router, private toastr: ToastrService, private loggedinserve: ListenLogedInService) {
  }


  LoginClicked = () => {
    //console.log("clicked");
    this.wrongEmail = this.validateEmail(this.email);
    if (!this.password) {
      this.wrongPassword = true;
      return;
    }
    if (!this.wrongEmail && !this.wrongPassword) {
      const user = {
        email: this.email,
        password: this.password
      }
      const resObj = this.doLogin(user);
      console.log("Login:", resObj);
      if (resObj.res) {

        this.toastr.success(resObj.msg);
        localStorage.setItem("user", JSON.stringify(resObj));
        this.loggedinserve.isSomeoneLoggedIn = true;
        this.loggedinserve.userName = resObj.name;
        this.loggedinserve.role = resObj.role;
        if (resObj.role === "student") {
          this.router.navigate(['apply-request']);
        } else if (resObj.role === "admin") {
          this.router.navigate(['admin-dashboard']);
        } else if (resObj.role === "staff") {
          this.router.navigate(['staff-dashboard']);
        }



        this.email = "";
        this.password = "";
      } else {
        this.toastr.error(resObj.msg);
      }
    }
  }
  validateEmail(email: any) {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !pattern.test(email))
      return true;
    return false;
  }
  resetAllVal = () => {
    this.wrongEmail = false;
    this.wrongPassword = false;
  }
  doLogin(user: any) {
    let dummyStudent = {
      id: 123,
      name: "Vishwas",
      role: "student"
    };
    let dummyAdmin = {
      id: 456,
      name: "Admin",
      role: "admin"
    };
    let dummyStaf = {
      id: 890,
      name: "Guddu",
      role: "staff"
    };
    if (user.email === "abc@gmail.com" && user.password === "12345") {
      return { ...dummyStudent, res: true, msg: "Login Success!" };
    } else if (user.email === "admin@gmail.com" && user.password === "12345") {
      return { ...dummyAdmin, res: true, msg: "login Success!" }
    } else if (user.email === "staff@gmail.com" && user.password === "12345") {
      return { ...dummyStaf, res: true, msg: "login Success!" }
    } else {
      return { res: false, msg: "wrong login credentials!", role: "none", name: "none" };
    }

  }
  registerStudent = () => {
    this.router.navigate(['register-student']);
  }
}
