import { Component, OnInit, Input} from '@angular/core';
import { Student } from '../Models/Student.model';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-display-student',
  templateUrl: './display-student.component.html',
  styleUrls: ['./display-student.component.css']
})
export class DisplayStudentComponent implements OnInit {
@Input() student:Student;
@Input() searchTerm:string;
  constructor(private _router: Router,           
              private http:HttpClient) { }

  ngOnInit() { 

  }
  
viewStudent(){
  this._router.navigate(['/student',this.student.mongoid]);
}

editStudent(){
  this._router.navigate(['/edit',this.student.mongoid]);
}

deleteStudent(id:string){
    console.log(id);
    this.http.delete<{message:string}>("http://localhost:3000/delete/" + id)
            .subscribe(result => console.log(result));     
  }
}
