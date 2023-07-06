import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { SubjectNotice } from 'src/models/subjectNotice.model';
import { SubjectNoticeService } from 'src/services/subjectNotice.service';
import { SubjectNoticeFile } from 'src/models/subjectNoticeFile.model';
import { SubjectNoticeFileService } from 'src/services/subjectNoticeFile.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'src/models/subject.model';

@Component({
  selector: 'app-zaposleni-azuriraj-predmetno-obavestenje',
  templateUrl: './zaposleni-azuriraj-predmetno-obavestenje.component.html',
  styleUrls: ['./zaposleni-azuriraj-predmetno-obavestenje.component.css']
})
export class ZaposleniAzurirajPredmetnoObavestenjeComponent implements OnInit {

  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef;
  datum:Date=new Date();
  maxDate:Date=new Date();
  errorMsg:string='';
  successMsg:string='';
  naslov:string='';
  tekst:string='';
  id:number=0;
  subjectCode:string='';
  files:FormData[]=[];
  fileNames:string[]=[];
  datumControl=new FormControl('',[Validators.required]);
  naslovControl=new FormControl('',[Validators.required]);
  tekstControl=new FormControl('',[Validators.required]);
  subjectNoticeFiles:SubjectNoticeFile[]=[];
  subjectNotice=<SubjectNotice>{};

  constructor(private subjectNoticeService:SubjectNoticeService, private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    if(localStorage.getItem('type')!='employee'){
      this.router.navigate(['']);
    }
    this.subjectNotice=JSON.parse(localStorage.getItem('subjectNotice') || '{}');
    this.datum=this.subjectNotice.date;
    this.naslov=this.subjectNotice.title;
    this.tekst=this.subjectNotice.notice;
    this.id=this.subjectNotice.id;
    var predmet:Subject=JSON.parse(localStorage.getItem('predmet') || '{}')
    this.subjectCode=predmet.code;
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
  goToL(){
    this.router.navigate(['/zaposleniPredmetLab']);
  }
  goToD(){
    this.router.navigate(['/zaposleniPredmetProjekat']);
  }
  goToOb(){
    this.router.navigate(['/zaposleniPredmetObavestenja']);
  }

  back(){
    this.router.navigate(['/zaposleniPredmetObavestenja']);
  }

  
  getDatumErrorMessage() {
    return this.datumControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getTekstErrorMessage() {
    return this.tekstControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getNaslovErrorMessage() {
    return this.naslovControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  deleteMessage(){
    this.errorMsg='';
    this.successMsg='';
  }

  saveChanges(){//Poboljsati tako da mogu i fajlovi da se menjaju!
    if(this.getTekstErrorMessage()=='' && this.getNaslovErrorMessage()=='' && this.getDatumErrorMessage()==''){
      this.subjectNoticeService.update(this.id, this.naslov,this.subjectCode,this.datum,this.tekst).subscribe((subjectNotice:SubjectNotice)=>{
        if(!subjectNotice){
          this.successMsg='';
          this.errorMsg = 'Greška!';
          return;
        }
        else{
          this.errorMsg='';
          localStorage.setItem('subjectNotice',JSON.stringify(subjectNotice));
          this.successMsg='Izmene su sačuvane';
          return;
        }
      })
    }
    else{
      this.errorMsg='Nevalidni podaci';
      this.successMsg='';
    }
  }
}