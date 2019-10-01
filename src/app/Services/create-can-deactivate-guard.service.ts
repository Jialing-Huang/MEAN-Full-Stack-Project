import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CreateStudentComponent } from '../Students/create-student.component';

@Injectable({
  providedIn: 'root'
})
export class CreateCanDeactivateGuardService implements CanDeactivate<CreateStudentComponent>{
  canDeactivate(component:CreateStudentComponent): boolean {
    if(component.createStudentForm.dirty){
      return confirm('Are you sure leave the page?');
    }
    return true;
  }
}
