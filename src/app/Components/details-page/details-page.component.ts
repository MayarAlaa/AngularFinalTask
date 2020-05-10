import { Component, OnInit,OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import{Router, ActivatedRoute} from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';


@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit,OnDestroy {

  constructor(private router:Router,private myService:StudentsService,myActivatedRouter:ActivatedRoute) {
    this.id = myActivatedRouter.snapshot.params.id;
   }

  mySubscription:any;
  student;
  id;
  errorMsg;

  ngOnInit(): void {
    this.mySubscription = this.myService.getStudentById(this.id)
                            .subscribe((student)=>{
                              if (student)
                              this.student = student;
                            },
                            (err)=>{
                              this.errorMsg ="Not Found";  
                              console.log(err);
                            }
                            )
                            
  }


  checkDelete()
  {
     var sure = confirm(`Are you sure you want to delete student with id : ${this.id} and name : ${this.student.name}`);

     if (sure == true) {
      this.deleteStudent();
    } 
  }
  deleteStudent()
  {
  ///1-DeleteStudentCodeHere
   this.mySubscription = this.myService.removeStudent(this.id)
                         .subscribe(()=>{
                          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                            this.router.navigate(['/Students']);
                          });
                         }
                         ,(err)=>{
                          this.errorMsg ="Not Found";  
                          console.log(err);
                        })
   
   

  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
      this.errorMsg = " ";
    }
  }

}
