import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListenLogedInService {
  public isSomeoneLoggedIn:boolean=false;
  public userName:String;
  public role:String;

  public errorAnyThing:boolean=false;
  public errorStr:any;
  constructor() { }
}
