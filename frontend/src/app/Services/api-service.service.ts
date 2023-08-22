import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  apiUrl:any='http://3.142.133.104/api';
  // apiUrl: any = 'http://localhost:7000/api';

  

  constructor(private http: HttpClient) {
    
  }
  ngOnInit(){
    
  }
  getTokenAuth=()=>{
    let userFromLocal=localStorage.getItem("user");
    let api_key='';
    if(userFromLocal){
      const userobj=JSON.parse(userFromLocal);
      api_key=userobj.jwt;
    }
    
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`
      });  
      return headers;
  }


  registerUser = (reqObj: any): Observable<any> => {
    return this.http.post(`${this.apiUrl}/user/register-user`, reqObj);
  }

  loginUser = (reqObj: any): Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/user/login`, reqObj);
  }

  fetchStudentDetails = (skip: any, limit: any, search: any): Observable<any> => {
    // console.log("skipp:", skip);
    let token=this.getTokenAuth();
    if (search)
      return this.http.get(`${this.apiUrl}/details/all-student?limit=${limit}&skip=${skip}&search=${search}`,{ headers: token });
    else
      return this.http.get(`${this.apiUrl}/details/all-student?limit=${limit}&skip=${skip}`,{ headers: token });
  }

  fetchStaffList = (): Observable<any> => {
    let token=this.getTokenAuth();
    return this.http.get(`${this.apiUrl}/details/all-staff`,{ headers: token });
  }

  mapstaff = (reqObj: any): Observable<any> => {
    let token=this.getTokenAuth();
    return this.http.post(`${this.apiUrl}/details/update-staff-by-id`, reqObj,{ headers: token });
  }

  toggleAccess = (id:any): Observable<any> => {
    let token=this.getTokenAuth();
    return this.http.get(`${this.apiUrl}/user/toggle-access/${id}`,{ headers: token });
  }
  postRequests = (reqObj: any): Observable<any> => {
    let token=this.getTokenAuth();
    return this.http.post(`${this.apiUrl}/request/service-request`, reqObj,{ headers: token });
  }

  getServiceRequestsByRequesterId = (id:any): Observable<any> => {
    let token=this.getTokenAuth();
    return this.http.get(`${this.apiUrl}/request/requester-id/${id}`,{ headers: token });
  }
  deleteServiceRequestsByRequestId = (id:any): Observable<any> => {
    let token=this.getTokenAuth();
    return this.http.delete(`${this.apiUrl}/request/delete-by-id/${id}`,{ headers: token });
  }

  getTasksListByStaffUserId = (id:any): Observable<any> => {
    let token=this.getTokenAuth();
    return this.http.get(`${this.apiUrl}/request/tasks-list/${id}`,{ headers: token });
  }
  setRequestDoneByRequestId = (id:any): Observable<any> => {
    let token=this.getTokenAuth();
    return this.http.get(`${this.apiUrl}/request/setRequestDone/${id}`,{ headers: token });
  }

}
