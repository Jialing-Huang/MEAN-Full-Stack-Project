import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentServiceService } from '../Services/student-service.service';
import { Student } from '../Models/Student.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail-student',
  templateUrl: './detail-student.component.html',
  styleUrls: ['./detail-student.component.css']
})
export class DetailStudentComponent implements OnInit {
student:Student;
  constructor(private _route:ActivatedRoute,
              private _studentservice:StudentServiceService,
              private http:HttpClient) { }

  ngOnInit() {
    this._route.paramMap.subscribe((transferredItem) => {
      const parsedId = transferredItem.get('mongoid');
      this._studentservice.getStudentItem(parsedId).subscribe(data => this.student = data);
    })
  }

}
