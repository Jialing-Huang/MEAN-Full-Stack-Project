import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentServiceService } from '../Services/student-service.service';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';
import { Student } from '../Models/Student.model';
import { NgForm } from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
@ViewChild('studentForm',{static:false}) public createStudentForm:NgForm;
student:Student;

isCreate:boolean = false;
  constructor(private _studentservice:StudentServiceService,
              private _route:ActivatedRoute,
              private http:HttpClient) { }

  ngOnInit() {
    this._route.paramMap.subscribe((parameterMap) => {
      const routeMark = parameterMap.get('mongoid');
      this.getStudent(routeMark);  //routeMark is the id shown in the addres bar, like '0' in '/edit/0'
    });
  }

  getStudent(id:string){
    if(id === '0'){
     this.isCreate = true;
     this.student = {
      mongoid:null,
      FirstName:null,
      LastName:null,
      Gender:null
     }
    }else{
       this._studentservice.getStudentItem(id).subscribe((item) => {
         this.student = item;
      });
    }
  }

  saveStudent(){
    if(this.student.mongoid === null){   
      //Crete a new studnt in mongoDB through Express
      this.http.post<{message:string, storemongoid:string}>("http://localhost:3000/create", this.student)
              .subscribe((result) => {
                this.student.mongoid = result.storemongoid;  //Store the mongoDB generated mongoid
              
              //Add this new item into the listStudent
              this._studentservice.listStudents.push(this.student);                
              });
    }else{
      //Get the student item from the listStudent by mongoid and assign the updated student to it. 
      this._route.paramMap.subscribe((parameterMap) => {
        const routeMark = parameterMap.get('mongoid'); //To get a defined address as routeMark, otherwise, the undefined address error occur
        this.http.patch<{message:string, result:any}>("http://localhost:3000/update/" + routeMark, this.student)
                .subscribe(result => console.log(result));
      });     
    }
  }
}
