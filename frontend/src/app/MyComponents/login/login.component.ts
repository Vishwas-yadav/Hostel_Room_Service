import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ListenLogedInService } from 'src/app/Services/listen-loged-in.service';
import { ApiServiceService } from 'src/app/Services/api-service.service';

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

  constructor(private router: Router, private toastr: ToastrService, private loggedinserve: ListenLogedInService,private apiService:ApiServiceService) {
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
      const successLogin = this.doLogin(user);
      if (successLogin) {
        this.email = "";
        this.password = "";
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

    this.apiService.loginUser(user).subscribe(
      (res)=>{
        this.setLocalStorage(res.res);
        this.toastr.success(res.msg);

        if (res.res.role === "student") {
          this.router.navigate(['apply-request']);
        } else if (res.res.role === "admin") {
          this.router.navigate(['admin-dashboard']);
        } else if (res.res.role === "staff") {
          this.router.navigate(['staff-dashboard']);
        }

        return true;
      },
      (err)=>{
        this.toastr.error(err.error.err);
        console.log(err.error.err);
        return false;
      }
    )




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
  setLocalStorage(obj:any){
    console.log("obj:",obj);
    localStorage.setItem("user", JSON.stringify(obj));
    this.loggedinserve.isSomeoneLoggedIn = true;
    this.loggedinserve.userName = obj.name;
    this.loggedinserve.role = obj.role;
  }

  registerStudent = () => {
    this.router.navigate(['register-student']);
  }
}
