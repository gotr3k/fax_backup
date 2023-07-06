import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/models/employee.model';
import { Subject } from 'src/models/subject.model';
import { EmployeeService } from 'src/services/employee.service';
import { SubjectEmployeeListService } from 'src/services/subjectEmployeeList.service';
import { SubjectEmployeeList } from 'src/models/subjectEmployeeList.model'

@Component({
  selector: 'app-predmet-informacije',
  templateUrl: './predmet-informacije.component.html',
  styleUrls: ['./predmet-informacije.component.css']
})
export class PredmetInformacijeComponent implements OnInit {

  constructor(private router:Router, private subjectEmployeeListService:SubjectEmployeeListService, private employeeService:EmployeeService) { }
  subject=<Subject>{};
  profPUsernames:string[]=[];
  profVUsernames:string[]=[];
  profP:Employee[]=[];
  profV:Employee[]=[];

  ngOnInit(): void {
    this.subject=JSON.parse(localStorage.getItem('predmet') || '{}');
    this.subjectEmployeeListService.getAllEmployeesOfSubject(this.subject.id).subscribe((subjectEmployeeList:SubjectEmployeeList[])=>{
      subjectEmployeeList.forEach(element=>{
        if(element.type=='P'){
          this.employeeService.check(element.employeeUsername).subscribe((employee:Employee)=>{
            if(!this.profPUsernames.includes(employee.username)) {
              this.profPUsernames.push(employee.username);
              this.profP.push(employee);
            }      
          });
        }
        else{
          this.employeeService.check(element.employeeUsername).subscribe((employee:Employee)=>{
            if(!this.profVUsernames.includes(employee.username)) {
              this.profVUsernames.push(employee.username);
              this.profV.push(employee);
            }      
          });
        }
      });
    });
  }

  goToO(){
    this.router.navigate(['/predmetInformacije']);
  }
  goToP(){
    this.router.navigate(['/predmetPredavanja']);
  }
  goToV(){
    this.router.navigate(['/predmetVezbe']);
  }
  goToI(){
    this.router.navigate(['/predmetPitanja']);
  }
  goToOb(){
    this.router.navigate(['/predmetObavestenja']);
  }
  goToL(){
    this.router.navigate(['/predmetLab']);
  }
  goToD(){
    this.router.navigate(['/predmetProjekat']);
  }
  goToS(){
    this.router.navigate(['/predmetSpisak']);
  }
  back(){
    this.router.navigate([localStorage.getItem('lastPage')]);
  }

  tip(pr:Subject){
    if(pr.type==1){
      return 'Obavezni';
    }
    else{
      return 'Izborni';
    }
  }

  godina(pr:Subject){
    var god=pr.semester%2==0?(pr.semester-2)/2:(pr.semester-1)/2;
    switch(god){
      case 0: return 'Prva';break;
      case 1: return 'Druga';break;
      case 2: return 'Treća';break;
      case 3: return 'Četvrta';break;
      case 4: return 'Master';break;
      default: return 'X';break;
    }
  }

  odsek(pr:Subject){
    switch(pr.department){
      case 1:return 'RTI';break;
      case 2:return 'SI';break;
      case 3:return 'Ostali';break;
      case 4:return 'Master';break;
      default:return '';break;
    }
  }

  goTo(emp:Employee){
    localStorage.setItem('osoba',JSON.stringify(emp));
    this.router.navigate(['/osoba']);
  }

  semestar(pr:Subject){
    if(pr.semester%2==0){
      return 'Drugi';
    }
    else{
      return 'Prvi';
    }
  }
}
