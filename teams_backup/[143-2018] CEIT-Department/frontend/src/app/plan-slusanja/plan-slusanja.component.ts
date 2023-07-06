import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Student } from 'src/models/student.model';
import { StudentService } from 'src/services/student.service';
import { SubjectStudentList } from 'src/models/subjectStudentList.model';
import { SubjectStudentListService } from 'src/services/subjectStudentList.service';
import { mergeMap, skip } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { Router } from '@angular/router';
import { Subject } from 'src/models/subject.model';

interface Slusanje{
  student:Student,
  subject:Subject,
  added:boolean
}

@Component({
  selector: 'app-plan-slusanja',
  templateUrl: './plan-slusanja.component.html',
  styleUrls: ['./plan-slusanja.component.css']
})
export class PlanSlusanjaComponent implements OnInit, AfterViewInit {     //dodati interfejs koji nam govori da li je student vec u tabeli ili ne
  public loading=true;
  public slusanja:Slusanje[]=[];
  //public checked:boolean[]=[];
  public students: Student[] = [];
  public subjectStudentLists:SubjectStudentList[]=[];
  public subject=<Subject>{};
  public errorMsg:string='';
  public successMsg:string='';
  public columns=['username','index','surname','name', 'type', 'add','remove'];
  constructor(private subjectStudentListService: SubjectStudentListService, private studentService:StudentService, private router:Router) { }
  dataSource=new MatTableDataSource(this.slusanja);

  @ViewChild(MatSort) sort: MatSort=new MatSort;

  ngOnInit(): void {
    if(localStorage.getItem('type')!='admin'){
      this.router.navigate(['']);
    }
    this.subject=JSON.parse(localStorage.getItem('subject') || '{}');
    if(this.subject){
      this.studentService.getActiveStudents().subscribe((students:Student[])=>{
        students.forEach(student=>{
          var sl=<Slusanje>{};
          sl.student=student;
          sl.subject=this.subject;
          sl.added=false;
          console.log(student.username);
          this.subjectStudentListService.getAllSubjectsOfStudent(student.username).subscribe((list:SubjectStudentList[])=>{
            list.forEach(element=>{
              console.log('Element.subjectid:'+element.subjectId+'   Subject.id:'+this.subject.id);
              if(element.subjectId==this.subject.id){
                sl.added=true;
              }
            });
          });
          this.slusanja.push(sl);
          this.dataSource = new MatTableDataSource(this.slusanja);
        });
      });
      this.loading=false;
      console.log(this.slusanja);
      
      
      
      
      
      
      
      
      
      
      /* this.subjectStudentListService.getAllStudentsOfSubject(this.subject.id).subscribe((subjectStudentLists:SubjectStudentList[])=>{
        this.subjectStudentLists=subjectStudentLists;
      },
      (error:ErrorEvent)=>{
        this.errorMsg=error.error.message;
      }); */
    }

    /* this.studentService.getActiveStudents().subscribe((students:Student[])=>{
      this.students=students;

      this.dataSource = new MatTableDataSource(this.students);
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;

    }); */

    /* this.loading=false; */
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

  addStudent(slusanje:Slusanje){
    if(this.subject){
      this.subjectStudentListService.create(slusanje.student.username,this.subject.id).subscribe((subjectStudentList:SubjectStudentList)=>{
        if(subjectStudentList){
          slusanje.added=true;
        }
      });
        this.successMsg ='Student '+slusanje.student.username+' je dodat na predmet';
    }
    else{
      this.errorMsg="Greška"
    }
  }

  deleteAllEntries(){ //dodati dijalog!!!!
    
    this.subjectStudentListService.deleteBySubject(this.subject.id).pipe(
      mergeMap(()=>this.subjectStudentListService.getAllStudentsOfSubject(this.subject.id))
    ).subscribe((subjectStudentList:SubjectStudentList[])=>{
      this.subjectStudentLists=subjectStudentList;
      //for(var i=0;i<this.students.length;i++){
      //  this.rows[i].added=false;
      //}
      window.location.reload();
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });
  }

  removeStudent(slusanje:Slusanje){ //dodati dijalog

    if(this.subject){
      this.subjectStudentListService.deleteSubjectStudent(this.subject.id, slusanje.student.username)
      .pipe(
        mergeMap(()=>this.subjectStudentListService.getAllStudentsOfSubject(this.subject.id))
      ).subscribe((subjectStudentList:SubjectStudentList[])=>{
        slusanje.added=false;
        //window.location.reload();
      },
      (error:ErrorEvent)=>{
        this.errorMsg=error.error.message;
      });
    }
  }
}