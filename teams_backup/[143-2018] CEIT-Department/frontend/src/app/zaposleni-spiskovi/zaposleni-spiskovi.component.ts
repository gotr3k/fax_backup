import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { List } from 'src/models/list.model';
import { Student } from 'src/models/student.model';
import { StudentService } from 'src/services/student.service';
import { SubjectNoticeFile } from 'src/models/subjectNoticeFile.model';
import { ListService } from 'src/services/list.service';
import { SubjectNoticeFileService } from 'src/services/subjectNoticeFile.service';
import { StudentListService } from 'src/services/studentList.service';
import { StudentList } from 'src/models/studentList.model';

interface Spisak{
  spisak:List,
  students:Student[]
}

@Component({
  selector: 'app-zaposleni-spiskovi',
  templateUrl: './zaposleni-spiskovi.component.html',
  styleUrls: ['./zaposleni-spiskovi.component.css']
})
export class ZaposleniSpiskoviComponent implements OnInit {

  constructor(private router:Router, private listService:ListService, private studentService:StudentService, private studentListService:StudentListService) { }

  errorMsg:string='';
  subjectId:number=0;
  spiskovi:Spisak[]=[];
  ngOnInit(): void {
    var predmet=JSON.parse(localStorage.getItem('predmet') || '{}');
    this.subjectId=predmet.id;
    this.listService.getAllBySubject(this.subjectId).subscribe((lists:List[])=>{
      lists.forEach(element=>{
        var sp=<Spisak>{};
        sp.spisak=element;
        sp.students=[];
        this.studentListService.getAllByList(element.id).subscribe((studentList:StudentList[])=>{
          studentList.forEach(prijava=>{
            this.studentService.check(prijava.studentUsername.substring(0,9)).subscribe((student:Student)=>{
              sp.students.push(student);
              console.log(student);
            });
          });
        });
        this.spiskovi.push(sp);
      });
    });
  }

  goToO(){
    this.router.navigate(['/zaposleniPredmetO']);
  }
  goToP(){
    this.router.navigate(['/zaposleniPredmetPredavanja']);
  }
  goToV(){
    this.router.navigate(['/zaposleniPredmetVezbe']);
  }
  goToI(){
    this.router.navigate(['/zaposleniPredmetPitanja']);
  }
  goToOb(){
    this.router.navigate(['/zaposleniPredmetObavestenja']);
  }
  goToL(){
    this.router.navigate(['/zaposleniPredmetLab']);
  }
  goToD(){
    this.router.navigate(['/zaposleniPredmetProjekat']);
  }
  goToS(){
    this.router.navigate(['zaposleniSpiskovi'])
  }
  back(){
    this.router.navigate(['/zaposleniPredmeti']);
  }

  
  addList(){
    this.router.navigate(['/zaposleniDodajSpisak']);
  }

  updateList(spisak:List){
    localStorage.setItem('spisak',JSON.stringify(spisak));
    this.router.navigate(['/zaposleniAzurirajSpisak']); 
  }

  openList(spisak:List){
    spisak.open=!spisak.open;
    this.listService.update(spisak.id,spisak.name,spisak.date,spisak.time,spisak.subjectId,spisak.place,spisak.slots,spisak.open).subscribe((list:List)=>{

    });
  }
  deleteList(spisak:List){//dodati dijalog

    forkJoin([this.listService.deleteList(spisak.id),
              this.studentListService.deleteByList(spisak.id)]).pipe(
                mergeMap(()=>this.listService.getAllBySubject(this.subjectId))
              ).subscribe((lists:List[])=>{
                /* this.spiskovi=[];
                lists.forEach(element=>{
                  var sp=<Spisak>{};
                  sp.spisak=element;
                  this.studentListService.getAllByList(element.id).subscribe((studentList:StudentList[])=>{
                    studentList.forEach(prijava=>{
                      this.studentService.check(prijava.studentUsername).subscribe((student:Student)=>{
                        sp.students.push(student);
                      });
                    });
                  });
                  this.spiskovi.push(sp);
                }); */
              });
  }

  deleteAllLists(){//Napraviti! Moram da cuvam predmet u bazi za koji je vezan spisak
  
  }
}




