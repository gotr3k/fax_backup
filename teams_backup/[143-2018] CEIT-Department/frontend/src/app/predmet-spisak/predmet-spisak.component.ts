import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'src/models/list.model';
import { Student } from 'src/models/student.model';
import { StudentService } from 'src/services/student.service';
import { ListService } from 'src/services/list.service';
import { StudentListService } from 'src/services/studentList.service';
import { StudentList } from 'src/models/studentList.model';
import { Subject } from 'src/models/subject.model';
import { mergeMap } from 'rxjs/operators';


interface Spisak{
  spisak:List,
  students:Student[]
  enrolled:boolean
}

@Component({
  selector: 'app-predmet-spisak',
  templateUrl: './predmet-spisak.component.html',
  styleUrls: ['./predmet-spisak.component.css']
})
export class PredmetSpisakComponent implements OnInit {

  constructor(private router:Router, private listService:ListService, private studentService:StudentService, private studentListService:StudentListService) { }
  subject=<Subject>{};
  type:string='';
  errorMsg:string='';
  spiskovi:Spisak[]=[];
  username:string='';
  ngOnInit(): void {
    this.type=localStorage.getItem('type') || '';
    this.subject=JSON.parse(localStorage.getItem('predmet') || '{}');
    this.username=JSON.parse(localStorage.getItem('user') || '{}');

    this.listService.getAllBySubject(this.subject.id).subscribe((lists:List[])=>{
      lists.forEach(element=>{
        var sp=<Spisak>{};
        sp.spisak=element;
        sp.enrolled=false;
        sp.students=[];
        this.studentListService.getAllByList(element.id).subscribe((studentList:StudentList[])=>{
          studentList.forEach(prijava=>{
            if(prijava.studentUsername==this.username){
              sp.enrolled=true;
            }
            this.studentService.check(prijava.studentUsername.substring(0,9)).subscribe((student:Student)=>{
              sp.students.push(student);
            });
          });
        });
        this.spiskovi.push(sp);
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

  enrollOnList(spisak:Spisak){
    if(spisak.enrolled==false){
      this.spiskovi=[];
      this.studentListService.create(this.username,spisak.spisak.id).pipe(
        mergeMap(()=>this.listService.update(spisak.spisak.id,spisak.spisak.name,spisak.spisak.date,spisak.spisak.time,spisak.spisak.subjectId,spisak.spisak.place,spisak.spisak.slots?spisak.spisak.slots-1:null,spisak.spisak.open))).pipe(
        mergeMap(()=>this.listService.getAllBySubject(this.subject.id))).subscribe((lists:List[])=>{
          lists.forEach(element=>{
            var sp=<Spisak>{};
            sp.spisak=element;
            sp.enrolled=false;
            sp.students=[];
            this.studentListService.getAllByList(element.id).subscribe((studentList:StudentList[])=>{
              studentList.forEach(prijava=>{
                if(prijava.studentUsername==this.username){
                  sp.enrolled=true;
                }
                this.studentService.check(prijava.studentUsername.substring(0,9)).subscribe((student:Student)=>{
                  sp.students.push(student);

                });
              });
            });
            this.spiskovi.push(sp);
          });
        });
    }
    else{
      this.spiskovi=[];
      this.studentListService.deleteByStudentList(this.username,spisak.spisak.id).pipe(
        mergeMap(()=>this.listService.update(spisak.spisak.id,spisak.spisak.name,spisak.spisak.date,spisak.spisak.time,spisak.spisak.subjectId,spisak.spisak.place,spisak.spisak.slots?spisak.spisak.slots+1:null,spisak.spisak.open))).pipe(
        mergeMap(()=>this.listService.getAllBySubject(this.subject.id))).subscribe((lists:List[])=>{
          lists.forEach(element=>{
            var sp=<Spisak>{};
            sp.spisak=element;
            sp.enrolled=false;
            sp.students=[];
            this.studentListService.getAllByList(element.id).subscribe((studentList:StudentList[])=>{
              studentList.forEach(prijava=>{
                if(prijava.studentUsername==this.username){
                  sp.enrolled=true;
                }
                this.studentService.check(prijava.studentUsername.substring(0,9)).subscribe((student:Student)=>{
                  sp.students.push(student);

                });
              });
            });
            this.spiskovi.push(sp);
          });
        });
    }
  }
}
