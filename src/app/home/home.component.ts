import { Component, OnInit } from '@angular/core';
import { Student } from '../shared/student';
import { OperationService } from '../services/operation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  students: Student;
  errMess: string;

  constructor(private operationService: OperationService, private router: Router) { }

  ngOnInit(): void {
    this.operationService.getStudent()
    .subscribe
    (
      data =>
      {
        this.students = data;
      }
    );
  }

  delete(id, studentName){
    const ans = confirm('Do you want to delete Student ' + studentName);
    if (ans){
      if (id){
        this.operationService.deleteStudent(id).subscribe();
        window.location.reload();
        alert('record deleted successfully!');
      }
      else{
        alert('error occurs in deleting');
      }
    }
    else{
      alert('your data is safe!');
    }
  }

  update(id){
    this.router.navigateByUrl('/addUpdateStudent/' + id);
  }

}
