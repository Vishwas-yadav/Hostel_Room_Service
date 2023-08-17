import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  apiUrl:any='http://localhost:3000/api';
  constructor(private http: HttpClient) {
   }
  

   registerUser=(reqObj:any):Observable<any>=>{
    return this.http.post(`${this.apiUrl}/user/register-user`,reqObj);
   }

   loginUser=(reqObj:any):Observable<any[]>=>{
    return this.http.post<any[]>(`${this.apiUrl}/user/login`,reqObj);
   }

  //  handleError(error:any) {
  //   console.log("Error in Service:",error.error.err);
  //   console.log("Error code:",error.status);
  //   let errorMessage = '';
  //   if (error.error instanceof ErrorEvent) {
  //     // client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   } else {
  //     // server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   //console.log(errorMessage);
  //   return throwError(() => {
  //       return errorMessage;
  //   });
  // }
}
