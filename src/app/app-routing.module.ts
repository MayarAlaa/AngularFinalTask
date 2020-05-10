import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from '@angular/router';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { StudentsPageComponent } from './Components/students-page/students-page.component';
import { DetailsPageComponent } from './Components/details-page/details-page.component';
import { AboutPageComponent } from './Components/about-page/about-page.component';


const routes:Routes=[
  {path:'',redirectTo:'Home',pathMatch:'full'},
  {path:'Home',component:HomePageComponent},
  {path:'Sudents',component:StudentsPageComponent},
  {path:'Student/:id',component:DetailsPageComponent},
  {path:'About',component:AboutPageComponent},
  {path:'**',component:StudentsPageComponent}
] 
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
