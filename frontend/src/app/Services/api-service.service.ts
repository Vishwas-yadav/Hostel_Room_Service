import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  // apiUrl:any='http://3.142.133.104/api';
  apiUrl: any = 'http://localhost:7000/api';

  constructor(private http: HttpClient) {
  }


  registerUser = (reqObj: any): Observable<any> => {
    return this.http.post(`${this.apiUrl}/user/register-user`, reqObj);
  }

  loginUser = (reqObj: any): Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/user/login`, reqObj);
  }

  fetchStudentDetails = (skip: any, limit: any, search: any): Observable<any> => {
    console.log("skipp:", skip);

    if (search)
      return this.http.get(`${this.apiUrl}/details/all-student?limit=${limit}&skip=${skip}&search=${search}`);
    else
      return this.http.get(`${this.apiUrl}/details/all-student?limit=${limit}&skip=${skip}`);
  }

  fetchStaffList = (): Observable<any> => {
    return this.http.get(`${this.apiUrl}/details/all-staff`);
  }

  mapstaff = (reqObj: any): Observable<any> => {
    return this.http.post(`${this.apiUrl}/details/update-staff-by-id`, reqObj);
  }

  toggleAccess = (id:any): Observable<any> => {
    return this.http.get(`${this.apiUrl}/user/toggle-access/${id}`);
  }
  postRequests = (reqObj: any): Observable<any> => {
    return this.http.post(`${this.apiUrl}/request/service-request`, reqObj);
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
