import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListStudentsComponent } from './Students/list-students.component';
import { CreateStudentComponent } from './Students/create-student.component';
import { DetailStudentComponent } from './Students/detail-student.component';
import { CreateCanDeactivateGuardService } from './Services/create-can-deactivate-guard.service';


const routes: Routes = [
  {path:'list', component:ListStudentsComponent},
  {path:'edit/:mongoid', 
   component:CreateStudentComponent,
   canDeactivate:[CreateCanDeactivateGuardService]},
  {path:'student/:mongoid', component:DetailStudentComponent},
  {path:'',redirectTo:'/list',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
