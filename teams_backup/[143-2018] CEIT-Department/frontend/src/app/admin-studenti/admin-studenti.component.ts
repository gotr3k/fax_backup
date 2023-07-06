import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Student } from 'src/models/student.model';
import { StudentService } from 'src/services/student.service';
import { mergeMap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SubjectStudentListService } from 'src/services/subjectStudentList.service';
import { StudentListService } from 'src/services/studentList.service';

@Component({
  selector: 'app-admin-studenti',
  templateUrl: './admin-studenti.component.html',
  styleUrls: ['./admin-studenti.component.css']
})
export class AdminStudentiComponent implements OnInit, AfterViewInit{
  public loading=true;
  public students: Student[] = [];
  public errorMsg:string='';
  public successMsg:string='';
  public columns=['username','index','surname','name', 'type', 'status','update','delete'];
  constructor(private studentService:StudentService, private subjectStudentListService:SubjectStudentListService, private studentListService:StudentListService,private router:Router) { }
  dataSource=new MatTableDataSource(this.students);
  

  @ViewChild(MatSort) sort!: MatSort;//videti zasto ne radi sort

  ngOnInit(): void {
    localStorage.removeItem('student');
    if(localStorage.getItem('type')!='admin'){
      this.router.navigate(['']);
    }

    this.studentService.getStudents().subscribe((students:Student[])=>{
      this.students=students;
      this.loading=false;
      this.dataSource = new MatTableDataSource(this.students);
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

  tipStudija(student:Student){
    if(student.type=='d'){
      return 'Osnovne akademske';
    }
    else{
      if(student.type=='m'){
        return 'Master akademske';
      }
      else{
        return 'Doktorske';
      }
    }
  }

  status(student:Student){
    return student.status?'Aktivan':'Neaktivan';
  }


  addStudent(){
    this.router.navigate(['/adminDodajStudenta']);
  }

  deleteAllStudents(){ //dodati dijalog!!!!
    forkJoin([this.studentService.deleteAllStudents(),this.subjectStudentListService.deleteAll(), this.studentListService.deleteAll()]).pipe(
      mergeMap(()=>this.studentService.getStudents())
    ).subscribe((students:Student[])=>{
      this.students=students;
      this.dataSource = new MatTableDataSource(this.students);
      this.dataSource.sort=this.sort;
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });


    /* this.studentService.deleteAllStudents().pipe(
      mergeMap(()=>this.studentService.getStudents())
    ).subscribe((students:Student[])=>{
      this.students=students;
      window.location.reload();
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    }); */
  }

  updateStudent(student:Student){
    localStorage.setItem('student', JSON.stringify(student));
    this.router.navigate(['/adminAzurirajStudenta']);
  }

  deleteStudent(id:number, username:string){ //dodati dijalog
    forkJoin([this.studentService.deleteStudent(id),this.subjectStudentListService.deleteByStudent(username),this.studentListService.deleteByStudent(username)]).pipe(
      mergeMap(()=>this.studentService.getStudents())
    ).subscribe((students:Student[])=>{
      this.students=students;
      this.dataSource = new MatTableDataSource(this.students);
      this.dataSource.sort=this.sort;
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
  });

    /* this.studentService.deleteStudent(id)
    .pipe(
      mergeMap(()=>this.studentService.getStudents())
    ).subscribe((students:Student[])=>{
      this.students=students;
      window.location.reload();
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });*/
  } 
}
