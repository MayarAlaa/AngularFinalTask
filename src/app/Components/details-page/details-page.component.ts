import { Component, OnInit,OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import{Router, ActivatedRoute} from '@angular/router';
import { StudentsService } from 'src/app/services/students.service';
import Swal from 'sweetalert2'


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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'The student has been deleted.',
          'success'
        
        ).then(()=>{this.deleteStudent();})

        
      }
    })
   
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
