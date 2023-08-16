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
      return false;
    }
  }
  return true;
};
