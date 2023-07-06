import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'src/models/subject.model';
import { SubjectService } from 'src/services/subject.service';
import { mergeMap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SubjectEmployeeListService } from 'src/services/subjectEmployeeList.service';
import { SubjectStudentListService } from 'src/services/subjectStudentList.service';
import { SubjectStudentList } from 'src/models/subjectStudentList.model';

@Component({
  selector: 'app-master-studije',
  templateUrl: './master-studije.component.html',
  styleUrls: ['./master-studije.component.css']
})
export class MasterStudijeComponent implements OnInit {

  public loading=true;
  public mySubjectsList:SubjectStudentList[]=[];
  public subjects11: Subject[] = [];
  public subjects12: Subject[] = [];
  public errorMsg:string='';
  public successMsg:string='';
  public columns=['code','name','type','espb'];
  dataSource11=new MatTableDataSource(this.subjects11);
  dataSource12=new MatTableDataSource(this.subjects12);
  constructor(private subjectStudentListService: SubjectStudentListService, private subjectService:SubjectService, private router:Router) { }

  @ViewChild(MatSort) sort1!: MatSort;
  @ViewChild(MatSort) sort2!: MatSort;//videti zasto ne radi ovaj sort

  ngOnInit(): void {
    localStorage.removeItem('predmet');
    if(localStorage.getItem('type')=='student'){
      var username:string=JSON.parse(localStorage.getItem('user') || '{}');
      this.subjectStudentListService.getAllSubjectsOfStudent(username).subscribe((list:SubjectStudentList[])=>{
        this.mySubjectsList=list;
      });
    }

    this.subjectService.getAllSubjectsDepartmentSemester(4,9).subscribe((subjects:Subject[])=>{
      this.subjects11=subjects;
      this.dataSource11 = new MatTableDataSource(this.subjects11);
      this.dataSource11.sort=this.sort1;
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    this.subjectService.getAllSubjectsDepartmentSemester(4,10).subscribe((subjects:Subject[])=>{
      this.subjects12=subjects;
      this.dataSource12 = new MatTableDataSource(this.subjects12);
      this.dataSource12.sort=this.sort2;
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    
    this.loading=false;
  }

  ngAfterViewInit() {
    this.dataSource11.sort = this.sort1;
    this.dataSource12.sort = this.sort2;
  }

  
  tip(subject:Subject){
    if(subject.type==1){
      return 'Obavezan';
    }
    else{
      if(subject.type==2){
        return 'Izborni';
      }
      else{
        return '';
      }
    }
  }

  goTo(subject:Subject){
    var mySubject=false;
    if(this.mySubjectsList.length>0){ 
      this.mySubjectsList.forEach(element=>{
          if(subject.id==element.subjectId){
            mySubject=true;
          }
        });
    }
    if(localStorage.getItem('type')=='admin' || localStorage.getItem('type')=='employee' || (localStorage.getItem('type')=='student' && mySubject)){
      localStorage.setItem('predmet',JSON.stringify(subject));
      localStorage.setItem('lastPage','/master');
      this.router.navigate(['/predmetObavestenja']);
    }
  }
}