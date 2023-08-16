import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListenLogedInService {
  public isSomeoneLoggedIn:boolean=false;
  public userName:String;
  public role:String;
  constructor() { }
}
