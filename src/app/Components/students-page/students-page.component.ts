import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from'@angular/router'
import { StudentsService } from 'src/app/services/students.service';
@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.css']
})
export class StudentsPageComponent implements OnInit,OnDestroy {
  mySubscription:any;
  students;
  errorMsg;
  // studentName:string;
  // studentImage;
  // studentId:number;

  constructor(private router:Router,private myService:StudentsService) { 
    //3shan y3ml Refresh mn8er reload

    this.router.routeReuseStrategy.shouldReuseRoute=function()
    {
    return false;
    };
  }

  
  ngOnInit(): void {

    this.mySubscription = this.myService.getStudents()
                                    .subscribe((students) => {
                                      if(students)
                                      {
                                        this.students = students;
                                      }
                                    }
                                    ,(error)=>{
                                      this.errorMsg ="Not Found";
                                     
                                      
                                    })  //display a message
  }
  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
      this.errorMsg = " ";
    }
  }

}
