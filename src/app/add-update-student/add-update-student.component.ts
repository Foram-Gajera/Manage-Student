import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperationService } from '../services/operation.service';
import { Student } from '../shared/student';

@Component({
  selector: 'app-add-update-student',
  templateUrl: './add-update-student.component.html',
  styleUrls: ['./add-update-student.component.css']
})
export class AddUpdateStudentComponent implements OnInit {

  createForm: FormGroup;
  submitted = false;
  student: Student;

  constructor(private formBuilder: FormBuilder, private operationservice: OperationService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id){
      this.updateStudentData(id);
    }
    else{
      this.addStudentData();
    }
  }

  addStudentData(){
    this.createForm = this.formBuilder.group({
      id: 0,
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required,  Validators.email]],
      rollNo: ['', Validators.required],
      date: ['', Validators.required],
      age: ['', Validators.required],
      isMale: ['', Validators.required],
    });
  }

  updateStudentData(id){
    this.operationservice.getStudentById(id).subscribe(
      (data) => {
          this.student = data[0];
          // if (this.student.isMale === 'true'){
          //   this.student.isMale.value = '' ;
          // }
          // alert(this.student.isMale);
          // if (this.student.isMale){
          //   this.student.isMale.checked = true;
          // }
          console.log(this.student);
          this.createForm = this.formBuilder.group({
            id: this.student.id,
            name: [this.student.name, [Validators.required, Validators.minLength(3)]],
            email: [this.student.email, [Validators.required, Validators.email]],
            rollNo: [this.student.rollNo, Validators.required],
            date: [this.student.date, Validators.required],
            age: [this.student.age, Validators.required],
            isMale: [this.student.isMale, Validators.required],
          });
      }
    );
  }

    onSubmit(){
      this.submitted = true;
      if (this.createForm.invalid) {
       return alert('form is invalid');
      }
      else{
       if (this.createForm.value.id === 0){
         alert(this.createForm.value);
         console.log(this.createForm.value);
         this.operationservice.postStudent(this.createForm.value).subscribe(
          (res: any) => {
            this.createForm.patchValue({id: res.id});
          }
        );
         alert('Successfully added!');
         console.log(this.createForm.value);
        }
        else {
          this.operationservice.putStudent(this.createForm.value.id, this.createForm.value).subscribe(
           (res: any) => {
           }
         );
          alert('Successfully updated!');
          console.log(this.createForm.value);
        }
      }
      this.createForm.reset();
      this.submitted = false;
      this.router.navigateByUrl('/home');

     }


}
