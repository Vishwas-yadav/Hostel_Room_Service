import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/Services/api-service.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  searchrollno:any;
  skip:any=0;
  limit:any=5;
  search:any;
  allList:any=[];
  total:any;
  allCount:any;
  allStaffsList:any=[];
  hostelName:any;
  wrongHostelName:boolean=false;
  serviceType:any;
  wrongserviceType:boolean=false;
  staffName:any;
  wrongStaffName:boolean=false;
  i:number=2;
  show:number=this.limit;
  constructor(private apiService:ApiServiceService,private toastr:ToastrService){
    this.fetchResults();
    this.apiService.fetchStaffList().subscribe(
      (res)=>{
        console.log("resresres",res.res);
        this.allStaffsList=res.res;
      },
      (err)=>{
        console.log("err",err.error.err);
        this.toastr.error("something went wrong!");
      }
    )
  }
  fetchResults=()=>{
  
    this.allList=[];
    this.apiService.fetchStudentDetails(this.skip,this.limit,this.search).subscribe(
      (res)=>{
        this.total=Number.parseInt(res.res.total);
        this.allCount=res.res.allcnt;
        for(let i=0;i<res.res.total;i++){
          this.allList.push(res.res[i]);
        }
       
      },
      (err)=>{
        console.log("err",err.error.err);
        this.toastr.error("something went wrong!");
      }
    )
  }
  searchClick=()=>{
    this.skip=0;
    this.limit=2;
    this.search=this.searchrollno;
    this.fetchResults();
  }
  nextClick=()=>{
    if((this.i*this.limit)<=this.allCount){
      this.skip=this.skip+this.limit;
      this.fetchResults();
      this.i++;
      this.show=this.i*this.limit;
    }else{
      if(this.show!=this.allCount){
        this.i--;
        this.skip=this.i*this.limit;
        this.fetchResults();
        this.show=this.allCount;
      }
      // this.fetchResults();
     
    }
  }
  prevClick=()=>{
    if(this.skip-this.limit>=0){
      this.i--;
      this.show=this.i*this.limit;
      this.skip=this.skip-this.limit;
      this.fetchResults();
    }else{
      this.skip=0;
      this.i=2;
      this.show=this.limit;
    }
  }

  submitMapping=()=>{
    if(!this.hostelName || !this.serviceType || !this.staffName)
    {
      this.toastr.error("Select value!");
      return;
    }
    let updateObj={
      assignedHostel:this.hostelName,
      serviceProvider:this.serviceType,
      id:this.staffName
    };
    this.apiService.mapstaff(updateObj).subscribe(
      (res)=>{
        this.toastr.success(res.msg);
      },
      (err)=>{
        console.log(err.error.err);
        this.toastr.error("something went wrong!");
      }
    )

    console.log(this.hostelName,this.serviceType,JSON.stringify(this.staffName));
  }

  accountDisable=(obj:any)=>{
    console.log(obj.logined[0]._id);
    this.apiService.toggleAccess(obj.logined[0]._id).subscribe(
      (res)=>{
        this.toastr.success(res.msg);
        this.fetchResults();
      },
      (err)=>{
        console.log(err.error.err);
        this.toastr.error("something went wrong!");
      }
    )
    
  }
}
