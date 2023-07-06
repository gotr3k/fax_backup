import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Notice } from 'src/models/notice.model';
import { NoticeService } from 'src/services/notice.service';

interface Kategorija{
  oznaka:number,
  naziv:string
}
@Component({
  selector: 'app-azuriraj-obavestenje',
  templateUrl: './azuriraj-obavestenje.component.html',
  styleUrls: ['./azuriraj-obavestenje.component.css']
})
export class AzurirajObavestenjeComponent implements OnInit {

  constructor(private noticeService:NoticeService, private router:Router) { }

  datum:Date=new Date();
  maxDate:Date=new Date();
  kat:number=0;
  errorMsg:string='';
  successMsg:string='';
  cats:Kategorija[]=[
    {
      oznaka:1,
      naziv:'Studentska takmičenja'
    },
    {
      oznaka:2,
      naziv:'Konferencije'
    },
    {
      oznaka:3,
      naziv:'Praksa'
    },
    {
      oznaka:4,
      naziv:'Posao'
    }
  ];
  naslov:string='';
  tekst:string='';
  id:number=0;
  datumControl=new FormControl('',[Validators.required]);
  naslovControl=new FormControl('',[Validators.required]);
  tekstControl=new FormControl('',[Validators.required]);
  
  ngOnInit(): void {
    if(localStorage.getItem('type')!='admin'){
      this.router.navigate(['']);
    }
    if(localStorage.getItem('notice')==null){
      this.router.navigate(['/obavestenja']);
    }
    var notice:Notice=JSON.parse(localStorage.getItem('notice') || '{}');
    this.id=notice.id;
    this.kat=notice.category;
    this.naslov=notice.title;
    this.tekst=notice.notice;
    this.datum=notice.date;
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

  update(){
    if(this.getTekstErrorMessage()=='' && this.getNaslovErrorMessage()=='' && this.getDatumErrorMessage()==''){
      this.noticeService.update(this.id,this.naslov,this.kat,this.datum,this.tekst).subscribe((notice:Notice)=>{
        if(!notice){
          this.successMsg='';
          this.errorMsg = 'Greška!';
          return;
        }
        else{
          this.errorMsg='';
          this.successMsg='Obaveštenje je ažurirano';
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
