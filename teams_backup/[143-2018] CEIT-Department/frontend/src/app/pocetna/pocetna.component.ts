import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'src/models/subject.model';
import { SubjectEmployeeList } from 'src/models/subjectEmployeeList.model';
import { SubjectStudentList } from 'src/models/subjectStudentList.model';
import { SubjectService } from 'src/services/subject.service';
import { SubjectEmployeeListService } from 'src/services/subjectEmployeeList.service';
import { SubjectStudentListService } from 'src/services/subjectStudentList.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {
  pokaziLogin:boolean=true;
  constructor(private subjectEmployeeListService: SubjectEmployeeListService, private subjectStudentListService: SubjectStudentListService, private subjectService:SubjectService, private router:Router) { }

  public loading=true;
  public studentSubjectsList:SubjectStudentList[]=[];
  public employeeSubjectsList:SubjectEmployeeList[]=[];
  public subjectsStudent: Subject[] = [];
  public subjectsEmployee: Subject[] = [];
  public tip=localStorage.getItem('type');
  public columns=['code','name', 'type','espb'];
  dataSourceStudent=new MatTableDataSource(this.subjectsStudent);
  dataSourceEmployee=new MatTableDataSource(this.subjectsEmployee);

  @ViewChild(MatSort) sort: MatSort=new MatSort;
  
  ngOnInit(): void {
    localStorage.removeItem('predmet');
    if(localStorage.getItem('type')=='student'){
      var username:string=JSON.parse(localStorage.getItem('user') || '{}');
      console.log(username);
      this.subjectStudentListService.getAllSubjectsOfStudent(username).subscribe((list:SubjectStudentList[])=>{
        this.studentSubjectsList=list;
        console.log(list);
        this.studentSubjectsList.forEach(element=>{
          this.subjectService.getSubject(element.subjectId).subscribe((subject:Subject)=>{
            this.subjectsStudent.push(subject);
            this.dataSourceStudent=new MatTableDataSource(this.subjectsStudent);
          });
        });
      });
    }
    this.loading=false;
  }

  fromAdminGoToStudenti(){
    this.router.navigate(['/adminStudenti']);
  }
  
  fromAdminGoToZaposleni(){
    this.router.navigate(['/adminZaposleni']);
  }

  fromAdminGoToPredmeti(){
    this.router.navigate(['/adminPredmeti']);
  }

  fromStudentGoToSubject(subject:Subject){
    localStorage.setItem('predmet',JSON.stringify(subject));
    localStorage.setItem('lastPage','');
    this.router.navigate(['/predmetObavestenja']);
  }

  fromEmployeeGoToPredmeti(){
    this.router.navigate(['/zaposleniPredmeti']);
  }

  fromEmployeeGoToProfil(){
    this.router.navigate(['/zaposleniProfil']);
  }

  fromEmployeeGoToSpiskovi(){
    this.router.navigate(['/zaposleniSpiskovi']);
  }

  tipPredmeta(subject:Subject){
    if(subject.type==1){
      return 'Obavezni';
    }
    else{
      return 'Izborni';
    }
  }
  promeni(){
    this.pokaziLogin=!this.pokaziLogin;
  }
}
