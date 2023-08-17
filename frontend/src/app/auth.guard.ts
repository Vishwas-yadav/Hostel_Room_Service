import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const userFromLocal=localStorage.getItem("user");
  if(userFromLocal){
    const userobj=JSON.parse(userFromLocal);
    if(userobj.role==="student"){
      return true;
    }
  }
  router.navigate(['']);
  return false;
};

export const authGuard2: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const userFromLocal=localStorage.getItem("user");
  if(!userFromLocal){
    return true;
  }
  if(userFromLocal){
    const userobj=JSON.parse(userFromLocal);
    if(userobj.role==="student"){
      router.navigate(['apply-request']);
    }else if(userobj.role==="admin"){
     router.navigate(['admin-dashboard']);
    }else if(userobj.role==="staff")
    router.navigate(['staff-dashboard']);
    return false;
  }
  return true;
};

export const authGuardAdmin: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const userFromLocal=localStorage.getItem("user");
  if(userFromLocal){
    const userobj=JSON.parse(userFromLocal);
    if(userobj.role==="admin"){
      return true;
    }
  }
  router.navigate(['']);
  return false;
};

export const authGuardStaff: CanActivateFn = (route, state) => {
  const router=inject(Router);
  const userFromLocal=localStorage.getItem("user");
  if(userFromLocal){
    const userobj=JSON.parse(userFromLocal);
    if(userobj.role==="staff"){
      return true;
    }
  }
  router.navigate(['']);
  return false;
};
