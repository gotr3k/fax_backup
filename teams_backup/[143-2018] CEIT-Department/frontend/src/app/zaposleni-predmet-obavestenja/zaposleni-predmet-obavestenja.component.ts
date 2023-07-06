import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { SubjectNotice } from 'src/models/subjectNotice.model';
import { SubjectNoticeFile } from 'src/models/subjectNoticeFile.model';
import { SubjectNoticeService } from 'src/services/subjectNotice.service';
import { SubjectNoticeFileService } from 'src/services/subjectNoticeFile.service';

interface Obavestenje{
  subjectNotice:SubjectNotice,
  files:SubjectNoticeFile[]
}

@Component({
  selector: 'app-zaposleni-predmet-obavestenja',
  templateUrl: './zaposleni-predmet-obavestenja.component.html',
  styleUrls: ['./zaposleni-predmet-obavestenja.component.css']
})


export class ZaposleniPredmetObavestenjaComponent implements OnInit {

  constructor(private subjectNoticeService:SubjectNoticeService,private router:Router, private subjectNoticeFileService:SubjectNoticeFileService) { }
  obavestenja:Obavestenje[]=[];
  subjectNotices:SubjectNotice[]=[];
  errorMsg:string='';
  subjectCode:string='';

  ngOnInit(): void {
    localStorage.removeItem('subjectNotice');
    var predmet=JSON.parse(localStorage.getItem('predmet') || '{}');
    this.subjectCode=predmet.code;
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

  addNotice(){
    this.router.navigate(['/zaposleniDodajPredmetnoObavestenje']);
  }

  updateNotice(subjectNotice:SubjectNotice){
    localStorage.setItem('subjectNotice',JSON.stringify(subjectNotice));
    this.router.navigate(['/zaposleniAzurirajPredmetnoObavestenje']); 
  }

  deleteAllNotices(){//dodati dijalog
    forkJoin([this.subjectNoticeService.deleteAllNotices(),
      this.subjectNoticeFileService.deleteAll()]).pipe(
        mergeMap(()=>this.subjectNoticeService.getAllSubject(this.subjectCode))
      ).subscribe((subjectNotices:SubjectNotice[])=>{
        this.subjectNotices=subjectNotices;
        console.log("BRISI SVE");
        window.location.reload();
      },
      (error:ErrorEvent)=>{
        this.errorMsg=error.error.message;
      });

    /* this.subjectNoticeService.deleteAllNotices().pipe(
      mergeMap(()=>this.subjectNoticeService.getAllSubject(this.subjectCode))
    ).subscribe((subjectNotices:SubjectNotice[])=>{
      this.subjectNotices=subjectNotices;
      window.location.reload();
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    }); */
  }

  deleteNotice(subjectNotice:SubjectNotice){//dodati dijalog

    forkJoin([this.subjectNoticeService.deleteNotice(subjectNotice.id),
              this.subjectNoticeFileService.deleteFilesByNoticeId(subjectNotice.id)]).pipe(
                mergeMap(()=>this.subjectNoticeService.getAllSubject(this.subjectCode))
              ).subscribe((subjectNotices:SubjectNotice[])=>{
                this.subjectNotices=subjectNotices;

                window.location.reload();
              },
              (error:ErrorEvent)=>{
                this.errorMsg=error.error.message;
              });



    /* this.subjectNoticeService.deleteNotice(subjectNotice.id).pipe(
      mergeMap(()=>this.subjectNoticeService.getAllSubject(this.subjectCode))
    ).subscribe((subjectNotices:SubjectNotice[])=>{
      this.subjectNotices=subjectNotices;
      window.location.reload();
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    }); */
  }
  download(file:SubjectNoticeFile){
    console.log(file.filePath);
    this.subjectNoticeFileService.download(file);
  }
}





