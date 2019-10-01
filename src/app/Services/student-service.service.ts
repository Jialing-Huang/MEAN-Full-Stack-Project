import { Injectable } from '@angular/core';
import { Student } from '../Models/Student.model';
import { Observable, of } from 'rxjs';
import {map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
listStudents:Student[]=[];
studentItem:Student = {
  FirstName:"AK",
  LastName:"PPS",
  Gender:"Male",
  mongoid:"FSDFDSF"
};

 
constructor(private http:HttpClient) { }

getStudents():Observable<Student[]>{
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
                });
            }))
            .subscribe((finalData) => {
              this.listStudents = finalData;
            });
  return of(this.listStudents);
}

getStudentItem(mongoid:string):Observable<Student>{
    this.http.get<{message:string, docs:any}>("http://localhost:3000/students/" + mongoid)
         .subscribe((finalData)=>{
           this.studentItem.FirstName = finalData.docs['FirstName'];
           this.studentItem.LastName = finalData.docs['LastName'];
           this.studentItem.Gender = finalData.docs['Gender'];
           this.studentItem.mongoid = finalData.docs['mongoid'];
         });
  return of(this.studentItem);
}
}
