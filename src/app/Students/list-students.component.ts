import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../Models/Student.model';
import { StudentServiceService } from '../Services/student-service.service'; 
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {

students:Student[] = [];

  constructor(private _studentservice:StudentServiceService,
              private http:HttpClient) { }

  ngOnInit() {
    //Get all students items from the mongoDB
    this.http.get<{message:string, students:any}>("http://localhost:3000/students")
            .pipe(map((transferData)=>{
              return transferData.students
               .map(
                 (student: { _id: any; FirstName: any; LastName: any; Gender: any; }) =>{
                   return {
                     mongoid:student._id,                 
                     FirstName:student.FirstName,
                     LastName:student.LastName,
                     Gender:student.Gender
                  }
                 }
               )
              ;
            })).subscribe((finalData) => {
              this.students = finalData;
            });
  }
}
