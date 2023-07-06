import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'src/models/subject.model';
import { SubjectEmployeeList } from 'src/models/subjectEmployeeList.model';
import { SubjectService } from 'src/services/subject.service';
import { SubjectEmployeeListService } from 'src/services/subjectEmployeeList.service';

@Component({
  selector: 'app-zaposleni-predmeti',
  templateUrl: './zaposleni-predmeti.component.html',
  styleUrls: ['./zaposleni-predmeti.component.css']
})
export class ZaposleniPredmetiComponent implements OnInit {

  public loading=true;
  public employeeSubjectsList:SubjectEmployeeList[]=[];
  public subjectsEmployee: Subject[] = [];
  public subjectIds:number[]=[];
  public columns=['code','name','department','type','espb'];
  dataSourceEmployee=new MatTableDataSource(this.subjectsEmployee);

  @ViewChild(MatSort) sort: MatSort=new MatSort;
  constructor(private subjectEmployeeListService: SubjectEmployeeListService, private subjectService:SubjectService, private router:Router) { }

  ngOnInit(): void {
    localStorage.removeItem('predmet');
    if(localStorage.getItem('type')=='employee'){
      var username:string=JSON.parse(localStorage.getItem('user') || '{}');
      this.subjectEmployeeListService.getAllSubjectsOfEmployee(username).subscribe((list:SubjectEmployeeList[])=>{
        this.employeeSubjectsList=list;
        this.employeeSubjectsList.forEach(element=>{
          this.subjectService.getSubject(element.subjectId).subscribe((subject:Subject)=>{
            if(!this.subjectIds.includes(subject.id)){
              this.subjectIds.push(subject.id);
              this.subjectsEmployee.push(subject);
              this.dataSourceEmployee=new MatTableDataSource(this.subjectsEmployee);
            }
          });
        });
        
      });
    }
    else{
      this.router.navigate(['/']);
    }
    this.loading=false;
  }

  tipPredmeta(subject:Subject){
    if(subject.type==1){
      return 'Obavezni';
    }
    else{
      return 'Izborni';
    }
  }

  odsek(subject:Subject){
    switch(subject.department){
      case 1: return 'RTI'; break;
      case 2: return 'SI'; break;
      case 3: return 'Ostali'; break;
      case 4: return 'Master'; break;
      default: return ''; break;
    }
  }
  
  fromEmployeeGoToSubject(subject:Subject){
    localStorage.setItem('predmet',JSON.stringify(subject));
    this.router.navigate(['/zaposleniPredmetO']);
  }
}
