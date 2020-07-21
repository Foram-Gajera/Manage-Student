import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddUpdateStudentComponent } from './add-update-student/add-update-student.component';


const routes: Routes = [
  {path: 'home' , component: HomeComponent},
  {path: 'addUpdateStudent' , component: AddUpdateStudentComponent},
  {path: 'addUpdateStudent/:id' , component: AddUpdateStudentComponent},
  {path: '' , redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
