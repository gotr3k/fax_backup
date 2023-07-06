import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Subject } from 'src/models/subject.model';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  uri = 'http://localhost:8080/api/subjects';

  constructor(private http: HttpClient) { }

  //Server vraca predmet na osnovu sifre
  getSubject(id:number){
    return this.http.get<Subject>(`${this.uri}/${id}`);
  }

  //Server vraca sve predmete
  getSubjects(){
      return this.http.get<Subject[]>(`${this.uri}`);
  }

  //Server vraca predmeta ciji se parametri poklapaju sa kodom i odsekom
  check(code:string, department:number){
    var data={
      code:code,
      department:department
    }
    return this.http.post<Subject>(`${this.uri}/check`, data);
  }

  //Server kreira predmet sa parametrima
  create(code:string, name:string, department:number, semester:number, espb: number, type:number, lectures:number, exc:number, lab: number,
    goal:string,
    result:string,
    lectureWhen:string,
    excWhen:string,
    comment:string,
    examVisible:boolean=true,
    labVisible:boolean=true,
    projectVisible:boolean=true){
    var data={
        code:code,
        name:name,
        department:department,
        semester:semester,
        espb: espb,
        type:type,
        lectures:lectures,
        exc:exc,
        lab: lab,
        goal:goal,
        result:result,
        lectureWhen:lectureWhen,
        excWhen:excWhen,
        comment:comment,
        examVisible:examVisible,
        labVisible:labVisible,
        projectVisible:projectVisible
    }
    return this.http.post<Subject>(`${this.uri}`, data);
  }

  //Vracanje svih RTI Predmeta
  getAllRTISubjects(){
    return this.http.get<Subject[]>(`${this.uri}/RTI`);
  }

  //Vracanje svih SI Predmeta
  getAllSISubjects(){
    return this.http.get<Subject[]>(`${this.uri}/SI`);
  }

  //Vracanje svih Predmeta sa ostalih odseka
  getAllOstaliSubjects(){
    return this.http.get<Subject[]>(`${this.uri}/Ostali`);
  }

  //Vracanje svih Master Predmeta
  getAllMasterSubjects(){
    return this.http.get<Subject[]>(`${this.uri}/Master`);
  }

  //Vrati sve predmete sa odredjenog semestra
  getAllSubjectsSemester(semester:number){
      var data={
          semester:semester
      }
      return this.http.post<Subject[]>(`${this.uri}/Semestar`,data);
  }
  
  //vrati sve predmete na osnovu odseka i semestra
  getAllSubjectsDepartmentSemester(department:number, semester:number){
      var data={
          department:department,
          semester:semester
      }
      return this.http.post<Subject[]>(`${this.uri}/OdsekSemestar`,data);
  }

  //Azuriraj predmet
  updateSubject(id:number, code:string, name:string, department:number, semester:number, espb: number, type:number, lectures:number, exc:number, lab: number,
    goal:string,
    result:string,
    lectureWhen:string,
    excWhen:string,
    comment:string,
    examVisible:boolean,
    labVisible:boolean,
    projectVisible:boolean){
        var data={
            id:id,
            code:code,
            name:name,
            department:department,
            semester:semester,
            espb: espb,
            type:type,
            lectures:lectures,
            exc:exc,
            lab: lab,
            goal:goal,
            result:result,
            lectureWhen:lectureWhen,
            excWhen:excWhen,
            comment:comment,
            examVisible:examVisible,
            labVisible:labVisible,
            projectVisible:projectVisible
        }
        return this.http.put<Subject>(`${this.uri}`, data);
    }

  //obrisi predmet na osnovu id-ja
  deleteSubject(id:number){
    return this.http.delete(`${this.uri}/${id}`);
  }

  //obrisi sve predmete
  deleteAllSubjects(){
    return this.http.delete(`${this.uri}`);
  }
}