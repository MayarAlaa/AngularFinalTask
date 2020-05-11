import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import {Router} from '@angular/router';
import {FormGroup, Validators,FormControl} from '@angular/forms';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit,OnDestroy{
  constructor(private router:Router,private myService:StudentsService) {
   
   }

   mySubscription;
   imgPath;
   errorMsg;
   regForm;
   
  get nameStatus (){return this.regForm.controls.name.valid;}
  get ageStatus  (){return this.regForm.controls.age.valid;}
  get mailStatus (){return this.regForm.controls.mail.valid;}
  ngOnInit(): void {

    this.regForm = new FormGroup({
      name:new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
      age:new FormControl('',[Validators.min(18),Validators.max(60)]),
      mail:new FormControl('',Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,4}$"))
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

 
  
  AddStudent()
  {
       if(this.regForm.valid)
        {    
           let student = {
                            name: this.regForm.get('name').value,
                            age: this.regForm.get('age').value,
                            email: this.regForm.get('mail').value,
                            image: this.imgPath??"assets/images/defaultImage.jpg"
                         }
                   
         // console.log(student);
          ///1-PostStudentCodeHere
          this.mySubscription = this.myService.insertStudent(student).subscribe(() =>
                                {
                                   ///3-Close Modal & GoToStudentsPage
                                 $('#exampleModalCenter .close').click()

                                 this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
                                 this.router.navigate(['/Students']);
                                 

                              }); 
                              
                                }
                                 
                                 ,(error)=>{
                                              this.errorMsg ="Error";
                                            })
                                        

 
       }
  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
      this.errorMsg = " ";
    }
   }
  


}
