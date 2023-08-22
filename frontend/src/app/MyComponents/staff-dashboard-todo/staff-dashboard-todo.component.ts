import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from 'src/app/Services/api-service.service';

@Component({
  selector: 'app-staff-dashboard-todo',
  templateUrl: './staff-dashboard-todo.component.html',
  styleUrls: ['./staff-dashboard-todo.component.css']
})
export class StaffDashboardTodoComponent {
  taskList:any=[];
constructor(private toastr: ToastrService,private apiService:ApiServiceService){
  this.getAllTasks();
}
getAllTasks(){
  let userFromLocal=localStorage.getItem("user");
  let userobj=userFromLocal?JSON.parse(userFromLocal):"";
  this.apiService.getTasksListByStaffUserId(userobj.userid).subscribe(
    (res)=>{
      this.taskList=res.res;
      console.log(res.res)
    },
    (err)=>{
      console.log(err.error.err);
    }
  )
}
markAsDone(list:any){
  console.log(list);
  let x=confirm("Are You sure, the Task is Done?");
  if(x){
    this.apiService.setRequestDoneByRequestId(list._id).subscribe(
      (res)=>{
        this.toastr.success(res.msg);
  this.getAllTasks();

      },
      (err)=>{
        console.log(err.error);
        this.toastr.error("Something went wrong!");
      }
    )
  }
  
}
}
