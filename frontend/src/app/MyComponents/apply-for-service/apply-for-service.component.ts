import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private toastr: ToastrService){
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


    const ReqObj={
      serviceType:this.selectedValue,
      serviceDescription:this.descValue,
      preferedDate:this.dateValue,
      preferedTimeFrom:this.timeFromValue,
      preferedTimeTo:this.timeToValue
    }

    let res=this.reqService(ReqObj);
    this.toastr.success(res.msg);
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
    localStorage.setItem("service",JSON.stringify(reqObj));
    return {msg:"Successfully Submitted Request!"}
  }
  deleteServiceRequest=(reqItem:any)=>{
   let cnf= confirm('Are you sure You want to delete?');
   if(!cnf)
   return;
    console.log("delete",reqItem);
    this.toastr.warning("deleted Service Request!");
    //this.reqObjArr.splice(reqItem.inx)
  }

  // mapServiceTypeWithServiceId=(selectedValue:String)=>{
  //   if(selectedValue==="Room Cleaning Service")
  //   return {s_id:1,name:"Room Cleaning Service"};

  //   if(selectedValue==="Electric Appliance Service")
  //   return {s_id:1,name:"Room Cleaning Service"};

  //   if(selectedValue==="Network Device Service")
  //   return {s_id:1,name:"Room Cleaning Service"};

  //   if(selectedValue==="Funiture Repair Service")
  //   return {s_id:1,name:"Room Cleaning Service"};


  // }

}
