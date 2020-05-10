import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private myClient:HttpClient) { }

  baseURL = "http://localhost:3000/students";

  getStudents()
  {
    return this.myClient.get(this.baseURL)
  }

  getStudentById(id)
  {
    return this.myClient.get(`${this.baseURL}/${id}`)
  }

  insertStudent(student:{name,age,email,image})
  {
    return this.myClient.post(this.baseURL,student)
  }

  updateStudent(id,student:{name,age,email,image})
  {
    return this.myClient.put(`${this.baseURL}/${id}`,student)
  }

  removeStudent(id)
  {
    return this.myClient.delete(`${this.baseURL}/${id}`)
  }
}
