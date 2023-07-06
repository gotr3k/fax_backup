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
  selector: 'app-si',
  templateUrl: './si.component.html',
  styleUrls: ['./si.component.css']
})
export class SiComponent implements OnInit {

  public loading=true;
  public mySubjectsList:SubjectStudentList[]=[];
  public subjects11: Subject[] = [];
  public subjects12: Subject[] = [];
  public subjects21: Subject[] = [];
  public subjects22: Subject[] = [];
  public subjects31: Subject[] = [];
  public subjects32: Subject[] = [];
  public subjects41: Subject[] = [];
  public subjects42: Subject[] = [];
  public errorMsg:string='';
  public successMsg:string='';
  public columns=['code','name','type','espb'];
  dataSource11=new MatTableDataSource(this.subjects11);
  dataSource12=new MatTableDataSource(this.subjects12);
  dataSource21=new MatTableDataSource(this.subjects21);
  dataSource22=new MatTableDataSource(this.subjects22);
  dataSource31=new MatTableDataSource(this.subjects31);
  dataSource32=new MatTableDataSource(this.subjects32);
  dataSource41=new MatTableDataSource(this.subjects41);
  dataSource42=new MatTableDataSource(this.subjects42);
  constructor(private subjectStudentListService: SubjectStudentListService, private subjectService:SubjectService, private router:Router) { }

  @ViewChild(MatSort) sort: MatSort=new MatSort;

  ngOnInit(): void {
    localStorage.removeItem('predmet');

    if(localStorage.getItem('type')=='student'){
      var username:string=JSON.parse(localStorage.getItem('user') || '{}');
      this.subjectStudentListService.getAllSubjectsOfStudent(username).subscribe((list:SubjectStudentList[])=>{
        this.mySubjectsList=list;
      });
    }

    this.subjectService.getAllSubjectsDepartmentSemester(2,1).subscribe((subjects:Subject[])=>{
      this.subjects11=subjects;
      this.dataSource11 = new MatTableDataSource(this.subjects11);
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    this.subjectService.getAllSubjectsDepartmentSemester(2,2).subscribe((subjects:Subject[])=>{
      this.subjects12=subjects;
      this.dataSource12 = new MatTableDataSource(this.subjects12);
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    this.subjectService.getAllSubjectsDepartmentSemester(2,3).subscribe((subjects:Subject[])=>{
      this.subjects21=subjects;
      this.dataSource21 = new MatTableDataSource(this.subjects21);
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    this.subjectService.getAllSubjectsDepartmentSemester(2,4).subscribe((subjects:Subject[])=>{
      this.subjects22=subjects;
      this.dataSource22 = new MatTableDataSource(this.subjects22);
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    this.subjectService.getAllSubjectsDepartmentSemester(2,5).subscribe((subjects:Subject[])=>{
      this.subjects31=subjects;
      this.dataSource31 = new MatTableDataSource(this.subjects31);
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    this.subjectService.getAllSubjectsDepartmentSemester(2,6).subscribe((subjects:Subject[])=>{
      this.subjects32=subjects;
      this.dataSource32 = new MatTableDataSource(this.subjects32);
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    this.subjectService.getAllSubjectsDepartmentSemester(2,7).subscribe((subjects:Subject[])=>{
      this.subjects41=subjects;
      this.dataSource41 = new MatTableDataSource(this.subjects41);
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    this.subjectService.getAllSubjectsDepartmentSemester(2,8).subscribe((subjects:Subject[])=>{
      this.subjects42=subjects;
      this.dataSource42 = new MatTableDataSource(this.subjects42);
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });
    this.loading=false;
  }

  

  ngAfterViewInit() {
    this.dataSource11.sort = this.sort;
    this.dataSource12.sort = this.sort;
    this.dataSource21.sort = this.sort;
    this.dataSource22.sort = this.sort;
    this.dataSource31.sort = this.sort;
    this.dataSource32.sort = this.sort;
    this.dataSource41.sort = this.sort;
    this.dataSource42.sort = this.sort;
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
      localStorage.setItem('lastPage','/si');
      this.router.navigate(['/predmetObavestenja']);
    }
  }
}