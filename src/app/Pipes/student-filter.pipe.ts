import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../Models/Student.model';

@Pipe({
  name: 'studentFilter'
})
export class StudentFilterPipe implements PipeTransform {

  transform(students: Student[], searchTerm: string): Student[] {
    if(!students || !searchTerm){
      return students;
    }
    return students.filter(student => 
      student.FirstName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }

}
