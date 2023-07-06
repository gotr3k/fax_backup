import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Student } from 'src/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  uri = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) { }

  //Server vraca studenta kome se poklapaju kor ime i lozinka sa parametrima
  logIn(username:string, password:string){
    var data={
      username: username,
      password: password
    }
    return this.http.post<Student>(`${this.uri}/login`, data);
  }

  //Server vraca studenta kome se poklapa kor ime sa parametrima
  check(username:string){
    var data={
      username:username+'@student.etf.rs'
    }
    return this.http.post<Student>(`${this.uri}/check`, data);
  }

  //Server kreira studenta sa parametrima
  register(username:string, password:string, index:string, type:string, name:string, surname:string){
    var data={
      username: username+'@student.etf.rs',
      password: password,
      index:index,
      type:type,
      name:name,
      surname:surname,
      status:1
    }
    return this.http.post<Student>(`${this.uri}`, data);
  }

  //Vracanje svih studenata
  getStudents(){
    return this.http.get<Student[]>(`${this.uri}`);
  }

  //Vracanje svih aktivnih studenata
  getActiveStudents(){
    return this.http.get<Student[]>(`${this.uri}/?status=1`);
  }

  //Vracanje svih neaktivnih studenata
  getInactiveStudents(){
    return this.http.get<Student[]>(`${this.uri}/?status=2`);
  }

  deleteStudent(id:number){
    return this.http.delete(`${this.uri}/${id}`);
  }

  updateStudent(id:number, username:string, index:string, type:string, name:string, surname:string, status:number){
    var data={
      id:id,
      username:username+'@student.etf.rs',
      index:index,
      type:type,
      name:name,
      surname:surname,
      status:status
    }
    return this.http.put<Student>(`${this.uri}`, data);
  }

  updateStudentWithPass(id:number, username:string, password:string, index:string, type:string, name:string, surname:string, status:number){
    var data={
      id:id,
      username:username+'@student.etf.rs',
      password:password,
      index:index,
      type:type,
      name:name,
      surname:surname,
      status:status
    }
    return this.http.put<Student>(`${this.uri}`, data);
  }

  deleteAllStudents(){
    return this.http.delete(`${this.uri}`);
  }
}