import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/Services/api-service.service';

@Component({
  selector: 'app-apply-for-service',
  templateUrl: './apply-for-service.component.html',
  styleUrls: ['./apply-for-service.component.css']
})
export class ApplyForServiceComponent {
  serviceType:any;
  selectedValue:any;
  descValue:String;
  dateValue:Date;
  timeFromValue:Date;
  timeToValue:Date;

  wrongServiceType:boolean=false;
  wrongDateValue:boolean=false;
  wrongTimeValue:boolean=false;

  reqObjArr:any;

  constructor(private toastr: ToastrService,private apiService:ApiServiceService){
  this.serviceType=[
      {s_id:1,name:"Room Cleaning Service"},
      {s_id:2,name:"Electric Appliance Service"},
      {s_id:3,name:"Network Device Service"},
      {s_id:4,name:"Funiture Repair Service"}
  ] 
  this.reqObjArr=[{serviceType:"Room Cleaning Service",reqDate:"12-12-2023",status:"Pending"},
  {serviceType:"Electric Appliance Service",reqDate:"25-12-2023",status:"Pending"}]; 
  }
  SubmitRequest=()=>{
    if(!this.selectedValue){
      this.wrongServiceType=true;
      return;
    }
    let TodayDate = new Date();                    
    TodayDate.setDate(TodayDate.getDate() - 1);
    
    if(!this.dateValue || (new Date(this.dateValue).getTime() <= TodayDate.getTime())){
      this.wrongDateValue=true;
      return;
    }
    if(!this.timeFromValue || !this.timeToValue || (this.timeFromValue>this.timeToValue)){
      this.wrongTimeValue=true;
      return;
    }

    let userFromLocal=localStorage.getItem("user");
     let userobj=userFromLocal?JSON.parse(userFromLocal):"";


    const ReqObj={
      serviceType:this.selectedValue,
      serviceDescription:this.descValue,
      preferedDate:this.dateValue,
      preferedTimeFrom:this.timeFromValue,
      preferedTimeTo:this.timeToValue,
      userid:userobj.userid
    }

    this.reqService(ReqObj);
    this.resetForm();
    //console.log("value picked:",this.selectedValue,this.descValue,this.dateValue,this.timeFromValue,this.timeToValue);

  }
  resetForm=()=>{
  this.selectedValue="";
  this.descValue="";
  }
  clickedAnyField=()=>{
    this.wrongServiceType=false;
    this.wrongDateValue=false;
    this.wrongTimeValue=false;
  }


  reqService=(reqObj:any)=>{
    console.log("obj:",reqObj);
    this.apiService.postRequests(reqObj).subscribe(
      (res)=>{
        this.toastr.success(res.msg);
      },
      (err)=>{
        console.log(err.error.err);
        this.toastr.error("something went wrong!");
      }
    )
    
    // localStorage.setItem("service",JSON.stringify(reqObj));
  }
  deleteServiceRequest=(reqItem:any)=>{
   let cnf= confirm('Are you sure You want to delete?');
   if(!cnf)
   return;
    console.log("delete",reqItem);
    this.toastr.warning("deleted Service Request!");
    //this.reqObjArr.splice(reqItem.inx)
  }

}
