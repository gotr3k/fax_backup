import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Subject } from 'src/models/subject.model';
import { SubjectNotice } from 'src/models/subjectNotice.model';
import { SubjectNoticeFile } from 'src/models/subjectNoticeFile.model';
import { SubjectNoticeService } from 'src/services/subjectNotice.service';
import { SubjectNoticeFileService } from 'src/services/subjectNoticeFile.service';

interface Obavestenje{
  subjectNotice:SubjectNotice,
  files:SubjectNoticeFile[]
}

@Component({
  selector: 'app-predmet-obavestenja',
  templateUrl: './predmet-obavestenja.component.html',
  styleUrls: ['./predmet-obavestenja.component.css']
})
export class PredmetObavestenjaComponent implements OnInit {

  constructor(private subjectNoticeService:SubjectNoticeService,private router:Router, private subjectNoticeFileService:SubjectNoticeFileService) { }
  obavestenja:Obavestenje[]=[];
  subjectNotices:SubjectNotice[]=[];
  errorMsg:string='';
  subjectCode:string='';
  subject=<Subject>{};
  ngOnInit(): void {
    localStorage.removeItem('subjectNotice');
    this.subject=JSON.parse(localStorage.getItem('predmet') || '{}');
    this.subjectCode=this.subject.code;
    this.subjectNoticeService.getAllSubject(this.subjectCode).subscribe((subjectNotices:SubjectNotice[])=>{
      subjectNotices.forEach(element=>{
        this.subjectNoticeFileService.getAllByNoticeId(element.id).subscribe((subjectNoticeFiles:SubjectNoticeFile[])=>{
          var sn=<Obavestenje>{};
          sn.files=subjectNoticeFiles;
          sn.subjectNotice=element;
          this.obavestenja.push(sn);
        })
      })
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    })
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

  download(file:SubjectNoticeFile){
    console.log(file.filePath);
    this.subjectNoticeFileService.download(file);
  }
}




