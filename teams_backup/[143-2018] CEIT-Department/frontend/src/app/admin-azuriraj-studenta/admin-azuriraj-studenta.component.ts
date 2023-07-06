import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/models/student.model';
import { StudentService } from 'src/services/student.service';

interface Status{
  naziv:string;
  oznaka:number;
}

interface TipStudija{
  naziv:string;
  oznaka:string;
}

@Component({
  selector: 'app-admin-azuriraj-studenta',
  templateUrl: './admin-azuriraj-studenta.component.html',
  styleUrls: ['./admin-azuriraj-studenta.component.css']
})

export class AdminAzurirajStudentaComponent implements OnInit {

  constructor(private studentService:StudentService, private router:Router) { }

  id:number=0;
  username:string='';
  password:string='';
  index:string='';
  ime:string='';
  prezime:string='';
  tipStud:string='';
  status:number=0;
  errorMsg:string='';
  successMsg:string='';
  usernameControl = new FormControl('', [Validators.required, Validators.pattern('^([a-z]){2}([0-9]){6}[dpm]$')]);
  indexControl=new FormControl('',[Validators.required, Validators.pattern('^([0-9]){4}\/([0-9]){4}$')]);
  imeControl=new FormControl('',[Validators.required]);
  prezimeControl=new FormControl('',[Validators.required]);
  tipControl=new FormControl('',[Validators.required]);

  tipoviStudija: TipStudija[] = [
    {oznaka: 'd', naziv: 'Osnovne akademske'},
    {oznaka: 'm', naziv: 'Master akademske'},
    {oznaka: 'p', naziv: 'Doktorske'}
  ];

  ngOnInit(): void {
    if(localStorage.getItem('type')!='admin'){
      this.router.navigate(['']);
    }
    if(localStorage.getItem('student')==null){
      this.router.navigate(['/adminStudenti']);
    }
    var student:Student=JSON.parse(localStorage.getItem('student') || '{}');
    this.id=student.id;
    this.username=student.username.substr(0,9);
    this.password=student.password;
    this.index=student.index;
    this.ime=student.name;
    this.tipStud=student.type;
    this.prezime=student.surname;
    this.status=student.status;
  }
  statusi:Status[]=[
    {naziv:'Aktivan', oznaka:1},
    {naziv:'Neaktivan',oznaka:0}
  ];

  getUsernameErrorMessage() {
    if(this.usernameControl.hasError('pattern')){
      return 'Nije oblika piGGBBBBx';
    }
    return this.usernameControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getIndexErrorMessage() {
    if(this.indexControl.hasError('pattern')){
      return 'Nije oblika GGGG/BBBB';
    }
    return this.indexControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getImeErrorMessage() {
    return this.imeControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getPrezimeErrorMessage() {
    return this.prezimeControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getTipErrorMessage() {
    return this.tipControl.hasError('required') ? 'Izaberite tip studija' : '';
  }

  deleteMessage(){
    this.errorMsg='';
    this.successMsg='';
  }

  update(){ //Ne radi
    if(this.getUsernameErrorMessage()=='' && this.getPrezimeErrorMessage()=='' &&
       this.getImeErrorMessage()=='' && this.getIndexErrorMessage()==''){
        this.studentService.updateStudent(this.id, this.username, this.index, this.tipStud, this.ime, this.prezime, this.status).subscribe((student:Student)=>{
          if(!student){
            this.successMsg='';
            this.errorMsg = 'Greška!';
            return;
          }
          else{
            var st:Student={
              id:this.id,
              username:this.username,
              password:this.password,
              name:this.ime,
              surname:this.prezime,
              index:this.index,
              type:this.tipStud,
              status:this.status
            }
            localStorage.setItem('student', JSON.stringify(st))
            this.errorMsg='';
            this.successMsg='Student je ažuriran';
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
