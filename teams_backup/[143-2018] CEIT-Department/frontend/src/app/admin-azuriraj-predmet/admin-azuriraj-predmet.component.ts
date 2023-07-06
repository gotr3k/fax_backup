import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'src/models/subject.model';
import { SubjectService } from 'src/services/subject.service';

//===POMOCNI INTERFEJSI==== (uglavnom zbog selecta u html delu)
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
  selector: 'app-admin-azuriraj-predmet',
  templateUrl: './admin-azuriraj-predmet.component.html',
  styleUrls: ['./admin-azuriraj-predmet.component.css']
})
export class AdminAzurirajPredmetComponent implements OnInit {

  constructor(private subjectService:SubjectService, private router:Router) { }

  id:number=0;
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
  examVisible:boolean=true;
  labVisible:boolean=true;
  projectVisible:boolean=true;

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
    },
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
    if(localStorage.getItem('subject')==null){
      this.router.navigate(['/adminPredmeti']);
    }
    var subject:Subject=JSON.parse(localStorage.getItem('subject') || '{}');
    this.id=subject.id,
    this.code=subject.code;
    this.name=subject.name;
    this.goal=subject.goal;
    this.result=subject.result;
    this.odsek=subject.department;
    this.tip=subject.type;
    this.semestar=subject.semester%2?1:2;
    this.godina=(subject.semester%2)?(subject.semester-1)/2:subject.semester/2-1;
    this.lectures=subject.lectures.toString();
    this.exc=subject.exc.toString();
    this.lab=subject.lab.toString();
    this.espb=subject.espb.toString();
    this.lectureWhen=subject.lectureWhen;
    this.excWhen=subject.excWhen;
    this.comment=subject.comment;
    this.examVisible=subject.examVisible;
    this.labVisible=subject.labVisible;
    this.projectVisible=subject.projectVisible;
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

  update(){//azuriranje predmeta
    if(this.getCodeErrorMessage()=='' && this.getNameErrorMessage()=='' && this.getLecturesErrorMessage()=='' &&
    this.getExcErrorMessage()=='' && this.getLabErrorMessage()=='' && this.getEspbErrorMessage()==''){
        this.subjectService.updateSubject(
          this.id,
          this.code,
          this.name,
          this.odsek,
          this.godina*2+this.semestar,
          parseFloat(this.espb),
          this.tip,
          parseFloat(this.lectures),
          parseFloat(this.exc),
          parseFloat(this.lab),
          this.goal,
          this.result,
          this.lectureWhen,
          this.excWhen,
          this.comment,
          this.examVisible,
          this.labVisible,
          this.projectVisible).subscribe((subject:Subject)=>{
            if(subject){//ako je uspelo azuriranje
              this.successMsg='Predmet je ažuriran';
              this.errorMsg='';
              var sub:Subject={//pravimo pomocni predmet koji cemo smestiti u local storage
                id:this.id,
                code:this.code,
                name:this.name,
                department:this.odsek,
                semester:this.godina*2+this.semestar,
                espb:parseFloat(this.espb),
                type:this.tip,
                lectures:parseFloat(this.lectures),
                exc:parseFloat(this.exc),
                lab:parseFloat(this.lab),
                goal:this.goal,
                result:this.result,
                lectureWhen:this.lectureWhen,
                excWhen:this.excWhen,
                comment:this.comment,
                examVisible:this.examVisible,
                labVisible:this.labVisible,
                projectVisible:this.projectVisible
              }
              localStorage.setItem('subject',JSON.stringify(sub));
            }
            else{
              this.errorMsg='Greška';
              this.successMsg='';
            }
          });
        
    }
    else{
      this.successMsg='';
      this.errorMsg='Nevalidni podaci!';
      return;
    }
  }
}