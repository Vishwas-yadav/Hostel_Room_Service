import { Component } from '@angular/core';
import { ListenLogedInService } from 'src/app/Services/listen-loged-in.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
constructor(public isLogedIn:ListenLogedInService){
  let userFromLocal=localStorage.getItem("user");
  // console.log("got::",userFromLocal);
  
  if(userFromLocal){
    const userobj=JSON.parse(userFromLocal);
    this.isLogedIn.isSomeoneLoggedIn=true;
    this.isLogedIn.userName=userobj.name;
    this.isLogedIn.role=userobj.role;
  }
}
logout=()=>{
  localStorage.removeItem("user");
  //this.isLogedoff=true;
  this.isLogedIn.isSomeoneLoggedIn=false;
  this.isLogedIn.userName="";
}
}
