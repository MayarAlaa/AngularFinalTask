import { Component, OnInit,OnDestroy ,Input} from '@angular/core';
import * as $ from 'jquery';
import  {Router,ActivatedRoute} from '@angular/router';
import {FormGroup, Validators,FormControl} from '@angular/forms';
import { StudentsService } from 'src/app/services/students.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit,OnDestroy {

  mySubscription;
  errorMsg;
  @Input('editStudent') student;
  id;
  regForm;
  imgPath;


  
  get nameStatus (){return this.regForm.controls.name.valid;}
  get ageStatus  (){return this.regForm.controls.age.valid;}
  get mailStatus (){return this.regForm.controls.mail.valid;}

  constructor(private router:Router,private myService:StudentsService,myActivatedRouter:ActivatedRoute) {
    this.id = myActivatedRouter.snapshot.params.id;
   }

  ngOnInit(): void {
    //console.log(this.id)
 this.regForm = new FormGroup({
    name:new FormControl(this.student.name,[Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
    age:new FormControl(this.student.age,[Validators.min(18),Validators.max(60)]),
    mail:new FormControl(this.student.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,4}$"))
  })

  var base64;
  var that = this;

  //3shan n7ot esm l sora elli e5tarha fl input
   $('#inputGroupFile01').on('change',function(){

  if(this.files && this.files[0])
  {

        //get the file name
       var fileName = $(this).val();

     //replace the "Choose a file" label
    
     var position = fileName.indexOf("\\", fileName.indexOf("\\") + 1);

     var fileNameDisplayed = fileName.substring(position+1);

     $(this).next('.custom-file-label').html(fileNameDisplayed);

    var FR= new FileReader();

    FR.addEventListener("load",function(e){
    
       base64 = e.target.result;

       that.imgPath = base64;

    });
    FR.readAsDataURL(this.files[0]);

  }
  
});

  }


  
  checkEditStudent()
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "You are editing student info!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Updated!',
          'The student has been edited.',
          'success'
        
        ).then(()=>{this.editStudent();})

        
      }
    })
   
  }
  
  editStudent()
  {
    let newStudent = {
      name: this.regForm.get('name').value,
      age: this.regForm.get('age').value,
      email: this.regForm.get('mail').value,
      image: this.imgPath?? this.student.image
   }


///1-PuttStudentCodeHere
this.mySubscription = this.myService.updateStudent(this.id,newStudent).subscribe(() =>
          {
             ///3-Close Modal & GoToStudentsPage
           $('#exampleModalCenter1 .close').click()

           this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
           this.router.navigate(['/Students']);
           

        }); 
        
          }
           
           ,(error)=>{
                        this.errorMsg ="Error";
                      })
                  
  }

 ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
      this.errorMsg = " ";
    }
   }

}
