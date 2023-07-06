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
  selector: 'app-dodaj-obavestenje',
  templateUrl: './dodaj-obavestenje.component.html',
  styleUrls: ['./dodaj-obavestenje.component.css']
})
export class DodajObavestenjeComponent implements OnInit {

  constructor(private noticeService:NoticeService, private router:Router) { }

  datum:Date=new Date();
  maxDate:Date=new Date();
  kat:number=1;
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
    localStorage.removeItem('notice');
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
  add(){
    if(this.getTekstErrorMessage()=='' && this.getNaslovErrorMessage()=='' && this.getDatumErrorMessage()==''){
      this.noticeService.create(this.naslov,this.kat,this.tekst,this.datum,).subscribe((notice:Notice)=>{
        if(!notice){
          this.successMsg='';
          this.errorMsg = 'Greška!';
          return;
        }
        else{
          this.errorMsg='';
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