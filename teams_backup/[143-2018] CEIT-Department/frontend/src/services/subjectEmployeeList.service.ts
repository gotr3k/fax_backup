import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { SubjectEmployeeList } from 'src/models/subjectEmployeeList.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectEmployeeListService {

  uri = 'http://localhost:8080/api/angazovanja';

  constructor(private http: HttpClient) { }

  create(employeeUsername:string, subjectId:number, type:string, group:number){
      var data={
          employeeUsername:employeeUsername,
          subjectId:subjectId,
          type:type,
          group:group
      }
      return this.http.post<SubjectEmployeeList>(`${this.uri}`,data);
  }
  
  getAll(){
    return this.http.get<SubjectEmployeeList[]>(`${this.uri}`);
  }
  
  getAllEmployeesOfSubject(subjectId:number){
      var data={
          subjectId:subjectId
      }
      return this.http.post<SubjectEmployeeList[]>(`${this.uri}/predmet`,data);
  }
    
  getAllEmployeesOfSubjectLectures(subjectId:number){
    var data={
        subjectId:subjectId
    }
    return this.http.post<SubjectEmployeeList[]>(`${this.uri}/predmetPredavanja`,data);
  }

  getAllEmployeesOfSubjectExc(subjectId:number){
    var data={
        subjectId:subjectId
    }
    return this.http.post<SubjectEmployeeList[]>(`${this.uri}/predmetVezbe`,data);
  }

  getAllSubjectsOfEmployee(employeeUsername:string){
    var data={
        employeeUsername:employeeUsername
    }
    return this.http.post<SubjectEmployeeList[]>(`${this.uri}/zaposleni`,data);
  }

  getAllSubjectsOfEmployeeLectures(employeeUsername:string){
    var data={
        employeeUsername:employeeUsername
    }
    return this.http.post<SubjectEmployeeList[]>(`${this.uri}/zaposleniPredavanja`,data);
  }

  getAllSubjectsOfEmployeeExc(employeeUsername:string){
    var data={
        employeeUsername:employeeUsername
    }
    return this.http.post<SubjectEmployeeList[]>(`${this.uri}/zaposleniVezbe`,data);
  }

  getAllTG(employeeUsername:string, subjectId:number){
    var data={
        employeeUsername:employeeUsername,
        subjectId:subjectId
    }
    return this.http.post<SubjectEmployeeList[]>(`${this.uri}/TG`,data);
  }
  
  deleteBySubject(subjectId:number){
    return this.http.delete(`${this.uri}/predmet/${subjectId}`);
  }
  
  deleteByEmployee(employeeUsername:string){
    return this.http.delete(`${this.uri}/zaposleni/${employeeUsername}`);
  }
  
  deleteAll(){
    return this.http.delete(`${this.uri}`);
  }
}