import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'src/models/subject.model';
import { SubjectEmployeeListService } from 'src/services/subjectEmployeeList.service';
import { SubjectEmployeeList } from 'src/models/subjectEmployeeList.model'
import { Employee } from 'src/models/employee.model';
import { EmployeeService } from 'src/services/employee.service';
import { FormControl, Validators } from '@angular/forms';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-plan-angazovanja',
  templateUrl: './plan-angazovanja.component.html',
  styleUrls: ['./plan-angazovanja.component.css']
})
export class PlanAngazovanjaComponent implements OnInit {


  constructor(private employeeService:EmployeeService, private subjectEmployeeListService:SubjectEmployeeListService, private router:Router) { }
  
  list:SubjectEmployeeList[]=[];
  errorMsg:string='';
  successMsg:string='';
  p:number=0;
  v:number=0;
  exc:string[]=[];
  lec:string[]=[];
  employees:Employee[]=[];
  subject=<Subject>{};

  vControl = new FormControl('', [Validators.required, Validators.pattern('^[0-4]$')]);
  pControl = new FormControl('',[Validators.required, Validators.pattern('^[0-4]$')]);

  ngOnInit(): void {
    if(localStorage.getItem('type')!='admin'){
      this.router.navigate(['']);
    }
    if(localStorage.getItem('subject')==null){
      this.router.navigate(['/adminPredmeti']);
    }
    this.subject=JSON.parse(localStorage.getItem('subject') || '{}');
    if(this.subject){
      this.subjectEmployeeListService.getAllEmployeesOfSubject(this.subject.id).subscribe((subjectEmployeeList:SubjectEmployeeList[])=>{
        this.list=subjectEmployeeList;
        this.list.forEach((element) => {
          if(element.type=='P'){
            this.lec[element.group-1]=element.employeeUsername;
            this.p++;
          }
          if(element.type=='V'){
            this.exc[element.group-1]=element.employeeUsername;
            this.v++;
          }
        });
      },
      (error:ErrorEvent)=>{
        this.errorMsg=error.error.message;
      });
    }

    this.employeeService.getEmployees().subscribe((employees:Employee[])=>{
      this.employees=employees;
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

  }

  getPErrorMessage() {
    if(this.pControl.hasError('pattern')){
      return 'Mora biti broj 0-4';
    }
    if(this.subject.lectures>0){
      return this.pControl.hasError('required') ? 'Ne može biti prazno' : '';
    }
    return '';
  }

  getVErrorMessage() {
    if(this.vControl.hasError('pattern')){
      return 'Mora biti broj 0-4';
    }
    if(this.subject.exc>0){
      return this.vControl.hasError('required') ? 'Ne može biti prazno' : '';
    }
    return '';
  }

  deleteMessage(){
    this.errorMsg='';
    this.successMsg='';
  }

  create(){
    if(this.getPErrorMessage()=='' && this.getVErrorMessage()==''){
    this.subjectEmployeeListService.deleteBySubject(this.subject.id).pipe(
      mergeMap(()=>this.subjectEmployeeListService.getAllEmployeesOfSubject(this.subject.id))
      ).subscribe((subjectEmployeeList:SubjectEmployeeList[])=>{
      this.list=subjectEmployeeList;
      },
      (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
      });

    for(var i=0;i<this.p;i++){
      if(this.lec[i]){
        this.subjectEmployeeListService.create(this.lec[i],this.subject.id, 'P',i+1).subscribe((subjectEmployeeList:SubjectEmployeeList)=>{
          if(!subjectEmployeeList){
            //this.successMsg+='';
            //this.errorMsg+= 'Greška!';
          }
          else{
            this.list.push(subjectEmployeeList);
            //this.errorMsg='';
            //this.successMsg+='P'+(i+1);
          }
        });
      }
    }
    for(var j=0;j<this.v;j++){
      if(this.exc[j]){
        this.subjectEmployeeListService.create(this.exc[j],this.subject.id, 'V',j+1).subscribe((subjectEmployeeList:SubjectEmployeeList)=>{
          if(!subjectEmployeeList){
            //this.successMsg='';
            //this.errorMsg= 'Greška!';
          }
          else{
            this.list.push(subjectEmployeeList);
            //this.errorMsg='';
            //this.successMsg+='V'+(j+1);
          }
        });
      }
    }
    this.successMsg ='Kreirana angažovanja';
  }
  else{
    this.successMsg='';
    this.errorMsg='Nevalidni podaci';
  }
  }

}
