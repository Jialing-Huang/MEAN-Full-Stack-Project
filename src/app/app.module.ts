import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListStudentsComponent } from './Students/list-students.component';
import { DisplayStudentComponent } from './Students/display-student.component';
import { DetailStudentComponent } from './Students/detail-student.component';
import { CreateStudentComponent } from './Students/create-student.component';
import { StudentFilterPipe } from './Pipes/student-filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    ListStudentsComponent,
    DisplayStudentComponent,
    DetailStudentComponent,
    CreateStudentComponent,
    StudentFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
