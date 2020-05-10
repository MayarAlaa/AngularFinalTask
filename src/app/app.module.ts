import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { StudentsPageComponent } from './Components/students-page/students-page.component';
import { RegisterPageComponent } from './Components/register-page/register-page.component';
import { AboutPageComponent } from './Components/about-page/about-page.component';
import { DetailsPageComponent } from './Components/details-page/details-page.component';
import { EditPageComponent } from './Components/edit-page/edit-page.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { StudentsService } from './services/students.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    StudentsPageComponent,
    RegisterPageComponent,
    AboutPageComponent,
    DetailsPageComponent,
    EditPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    StudentsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
