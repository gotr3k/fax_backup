import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'src/models/subject.model';
import { SubjectService } from 'src/services/subject.service';

interface Godina{
  naziv:string;
  oznaka:number;
}

interface Semestar{
  naziv:string;
  oznaka:number;
}

interface Tip{
  naziv:string;
  oznaka:number;
}

interface Odsek{
  naziv:string;
  oznaka:number;
}

@Component({
  selector: 'app-admin-dodaj-predmet',
  templateUrl: './admin-dodaj-predmet.component.html',
  styleUrls: ['./admin-dodaj-predmet.component.css']
})
export class AdminDodajPredmetComponent implements OnInit {

  constructor(private subjectService:SubjectService, private router:Router) { }

  code:string='';
  name:string='';
  goal:string='';
  result:string='';
  odsek:number=1;
  tip:number=1;
  semestar:number=1;
  godina:number=0;
  lectures:string='2';
  exc:string='2';
  lab:string='0';
  espb:string='5';
  lectureWhen:string='';
  excWhen:string='';
  comment:string='';
  errorMsg:string='';
  successMsg:string='';

  semestri:Semestar[]=[
    {
      naziv:'Prvi',
      oznaka:1
    },
    {
      naziv:'Drugi',
      oznaka:2
    }
  ];
  godine:Godina[]=[
    {
      naziv:'Prva',
      oznaka:0
    },
    {
      naziv:'Druga',
      oznaka:1
    },
    {
      naziv:'Treća',
      oznaka:2
    },
    {
      naziv:'Četvrta',
      oznaka:3
    },
    {
      naziv:'Master',
      oznaka:4
    }
  ];
  
  tipovi:Tip[]=[
    {
      naziv:'Obavezni',
      oznaka:1
    },
    {
      naziv:'Izborni',
      oznaka:2
    }
  ];
  odseci:Odsek[]=[
  {
    naziv:'RTI',
    oznaka:1
  },
  {
    naziv:'SI',
    oznaka:2
  },
  {
    naziv:'Ostali',
    oznaka:3
  },
  {
    naziv:'Master',
    oznaka:4
  }
  ];

  codeControl = new FormControl('', [Validators.required, Validators.pattern('^\\d\\d[A-Z]\\d\\d\\d([A-Z]){1,5}\\d?$')]);
  nameControl=new FormControl('',[Validators.required]);
  espbControl=new FormControl('',[Validators.required, Validators.pattern('^\\d+(\\.?\\d)?$'), Validators.max(15)]);
  lecturesControl=new FormControl('',[Validators.required, Validators.pattern('^\\d+(\\.?\\d)?$'), Validators.max(10)]);
  excControl=new FormControl('',[Validators.required, Validators.pattern('^\\d+(\\.?\\d)?$'), Validators.max(10)]);
  labControl=new FormControl('',[Validators.required, Validators.pattern('^\\d+(\\.?\\d)?$'), Validators.max(10)]);

  ngOnInit(): void {
    if(localStorage.getItem('type')!='admin'){
      this.router.navigate(['']);
    }
  }

  getCodeErrorMessage() {
    if(this.codeControl.hasError('pattern')){
      return 'Nedozvoljen oblik';
    }
    return this.codeControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getNameErrorMessage() {
    return this.nameControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getLecturesErrorMessage() {
    if(this.lecturesControl.hasError('pattern')){
      return 'Nedozvoljen oblik';
    }
    if(this.lecturesControl.hasError('max')){
      return 'Prevelika vrednost';
    }
    return this.lecturesControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getExcErrorMessage() {
    if(this.excControl.hasError('pattern')){
      return 'Nedozvoljen oblik';
    }
    if(this.excControl.hasError('max')){
      return 'Prevelika vrednost';
    }
    return this.excControl.hasError('required') ? 'Ne može biti prazno' : '';
  }
  
  getLabErrorMessage() {
    if(this.labControl.hasError('pattern')){
      return 'Nedozvoljen oblik';
    }
    if(this.labControl.hasError('max')){
      return 'Prevelika vrednost';
    }
    return this.labControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getEspbErrorMessage() {
    if(this.espbControl.hasError('pattern')){
      return 'Nedozvoljen oblik';
    }
    if(this.espbControl.hasError('max')){
      return 'Prevelika vrednost';
    }
    return this.espbControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  deleteMessage(){
    this.errorMsg='';
    this.successMsg='';
  }

  create(){//dodavanje novog predmeta
    if(this.getCodeErrorMessage()=='' && this.getNameErrorMessage()=='' && this.getLecturesErrorMessage()=='' &&
       this.getExcErrorMessage()=='' && this.getLabErrorMessage()=='' && this.getEspbErrorMessage()==''){     
          this.subjectService.check(this.code, this.odsek).subscribe((subject:Subject)=>{
            if(!subject){
              this.subjectService.create(this.code, this.name, this.odsek, this.semestar + this.godina*2, parseFloat(this.espb), this.tip, parseFloat(this.lectures), parseFloat(this.exc),
                parseFloat(this.lab),
                this.goal,
                this.result,
                this.lectureWhen,
                this.excWhen,
                this.comment).subscribe((subject:Subject)=>{
                if(!subject){
                  this.successMsg='';
                  this.errorMsg = 'Greška!';
                  return;
                }
                else{
                  this.errorMsg='';
                  this.successMsg='Predmet je kreiran';
                  return;
                }
              })
            }
            else{
              this.successMsg='';
              this.errorMsg='Već postoji predmet sa šifrom '+this.code;
              return;
            }
          })
    }
    else{
      this.successMsg='';
      this.errorMsg='Nevalidni podaci!';
      return;
    }
  }
}