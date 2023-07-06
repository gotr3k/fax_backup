import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { mergeMap, skip } from 'rxjs/operators';
import { Employee } from 'src/models/employee.model';
import { EmployeeService } from 'src/services/employee.service';
import { SubjectEmployeeList } from 'src/models/subjectEmployeeList.model';
import { SubjectEmployeeListService } from 'src/services/subjectEmployeeList.service';


@Component({
  selector: 'app-zaposleni',
  templateUrl: './zaposleni.component.html',
  styleUrls: ['./zaposleni.component.css']
})
export class ZaposleniComponent implements OnInit, AfterViewInit {

  public loading=true;
  public employees: Employee[] = [];
  public list:SubjectEmployeeList[]=[];
  public errorMsg:string='';
  public successMsg:string='';
  public columns=['fullName', 'rank'];
  constructor(private subjectEmployeeListService:SubjectEmployeeListService, private employeeService:EmployeeService, private router:Router) { }
  dataSource=new MatTableDataSource(this.employees);

  @ViewChild(MatSort) sort: MatSort=new MatSort;

  ngOnInit(): void {
    localStorage.removeItem('osoba');

    this.employeeService.getEmployees().subscribe((employees:Employee[])=>{
      this.employees=employees;
      this.dataSource = new MatTableDataSource(this.employees);
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    this.subjectEmployeeListService.getAll().subscribe((subjectEmployeeList:SubjectEmployeeList[])=>{
      this.list=subjectEmployeeList;
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    this.loading=false;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  goTo(employee:Employee){
    localStorage.setItem('osoba',JSON.stringify(employee));
    this.router.navigate(['/osoba']);
  }
  predaje(employee:Employee){ //memory leak?!
    /* var s:string='';
    var mylist:SubjectEmployeeList[]=[];
    this.subjectEmployeeListService.getAllSubjectsOfEmployee(employee.username).subscribe((subjectEmployeeList:SubjectEmployeeList[])=>{
      mylist=subjectEmployeeList;
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    mylist.forEach(element=>{
      s+=element.type+element.group+" "+element.subjectCode+", ";
    });
    return s; */
  }
}