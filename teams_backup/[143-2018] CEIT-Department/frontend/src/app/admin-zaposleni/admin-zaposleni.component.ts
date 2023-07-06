import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Employee } from 'src/models/employee.model';
import { EmployeeService } from 'src/services/employee.service';
import { EmployeeAvatarService } from 'src/services/employeeAvatar.service';
import { SubjectEmployeeListService } from 'src/services/subjectEmployeeList.service';

@Component({
  selector: 'app-admin-zaposleni',
  templateUrl: './admin-zaposleni.component.html',
  styleUrls: ['./admin-zaposleni.component.css']
})
export class AdminZaposleniComponent implements OnInit, AfterViewInit {

  public loading=true;
  public employees: Employee[] = [];
  public errorMsg:string='';
  public successMsg:string='';
  public columns=['username','surname','name', 'rank', 'room','update','delete'];
  constructor(private employeeService:EmployeeService, private router:Router, private employeeAvatarService:EmployeeAvatarService, private subjectEmployeeListService:SubjectEmployeeListService) { }
  dataSource=new MatTableDataSource(this.employees);
  

  @ViewChild(MatSort) sort!: MatSort;//videti zasto ne radi sort

  ngOnInit(): void {
    localStorage.removeItem('employee');
    if(localStorage.getItem('type')!='admin'){
      this.router.navigate(['']);
    }

    this.employeeService.getEmployees().subscribe((employees:Employee[])=>{
      this.employees=employees;
      this.loading=false;
      this.dataSource = new MatTableDataSource(this.employees);
      this.dataSource.sort=this.sort;
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
      this.loading=false;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  status(employee:Employee){
    return employee.status?'Aktivan':'Neaktivan';
  }


  addEmployee(){
    this.router.navigate(['/adminDodajZaposlenog']);
  }

  deleteAllEmployees(){ //dodati dijalog!!!
    forkJoin([this.employeeService.deleteAllEmployees(),this.subjectEmployeeListService.deleteAll(),this.employeeAvatarService.deleteAll()])
    .pipe(
      mergeMap(()=>this.employeeService.getEmployees())
    ).subscribe((employees:Employee[])=>{
      this.employees=employees;
      window.location.reload();
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });
  }

  updateEmployee(employee:Employee){
    localStorage.setItem('employee', JSON.stringify(employee));
    this.router.navigate(['/adminAzurirajZaposlenog']);
  }

  deleteEmployee(employee:Employee){  //dodati dijalog

    forkJoin([this.employeeService.deleteEmployee(employee.id),this.subjectEmployeeListService.deleteByEmployee(employee.username),this.employeeAvatarService.deleteFilesByEmployeeId(employee.id)])
    .pipe(
      mergeMap(()=>this.employeeService.getEmployees())
    ).subscribe((employees:Employee[])=>{
      this.employees=employees;
      this.dataSource = new MatTableDataSource(this.employees);
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });
  }

}
