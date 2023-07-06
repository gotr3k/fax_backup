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
  selector: 'app-zaposleni-dodaj-predmetno-obavestenje',
  templateUrl: './zaposleni-dodaj-predmetno-obavestenje.component.html',
  styleUrls: ['./zaposleni-dodaj-predmetno-obavestenje.component.css']
})
export class ZaposleniDodajPredmetnoObavestenjeComponent implements OnInit {

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

  constructor(private subjectNoticeService:SubjectNoticeService, private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    if(localStorage.getItem('type')!='employee'){
      this.router.navigate(['']);
    }
    localStorage.removeItem('subjectNotice');
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

  addFileToList(){
    const fileBlob=this.fileInput.nativeElement.files[0];
    const file=new FormData();
    const size=fileBlob.size;
    this.fileNames.push(size+'*'+fileBlob.name);
    file.set('file',fileBlob,size+'*'+fileBlob.name);
    this.files.push(file);
  }

  nazivFajla(s:string){
    s=s.substring(s.indexOf('*')+1,s.length);
    if(s.length<30){
      return s;
    }
    else{
      return s.substring(0,14)+'...'+s.substring(s.length-14,s.length);
    }
  }
  add(){//Poboljsati
    if(this.getTekstErrorMessage()=='' && this.getNaslovErrorMessage()=='' && this.getDatumErrorMessage()==''){
      this.subjectNoticeService.create(this.naslov,this.subjectCode,this.tekst,this.datum,).subscribe((subjectNotice:SubjectNotice)=>{
        if(!subjectNotice){
          this.successMsg='';
          this.errorMsg = 'Greška!';
          return;
        }
        else{
          this.errorMsg='';
          var i=0;
          this.files.forEach(element=>{//Za svaki fajl u nizu fajlova
          const file=this.files[i];//uzimamo fajl sa indexom i
          const fileName=this.fileNames[i];//i ime fajla sa istim indexom
          i++;
            if(typeof file === 'object'){//ako fajl nije null
              const entry=file.get('file');//uzimamo unos iz fajla
              if(entry!=null){
                const newFile=new FormData();
                newFile.set('file',entry,subjectNotice.id+'*'+fileName);
                this.http.post('http://localhost:8080/api/subjectNoticeFiles',newFile).subscribe(response=>{
                console.log(response);
                });    
              }   
            }
          });
          this.successMsg='Obaveštenje je dodato';
          return;
        }
      })
    }
    else{
      this.errorMsg='Nevalidni podaci';
      this.successMsg='';
    }
  }

  deleteMessage(){
    this.errorMsg='';
    this.successMsg='';
  }


}