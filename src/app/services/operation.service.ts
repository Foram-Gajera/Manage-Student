import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  rootUrl = 'http://gsmktg.azurewebsites.net/api/v1/techlabs/test/students/';

  constructor(private http: HttpClient) { }

  getStudent(): Observable<any>{
    return this.http.get(this.rootUrl);
  }

  getStudentById(id): Observable<any>{
    return this.http.get(this.rootUrl + id);
  }

  postStudent(student){
    // alert(user)
    return this.http.post(this.rootUrl, student );
  }

  putStudent(id, student){
    return this.http.put(this.rootUrl + id , student );
  }

  deleteStudent(id){
    return this.http.delete(this.rootUrl + id);
  }
}
