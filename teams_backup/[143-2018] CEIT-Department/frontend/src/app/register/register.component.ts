import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/models/student.model';
import { StudentService } from 'src/services/student.service';

interface TipStudija{
  naziv:string;
  oznaka:string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(private studentService:StudentService, private router:Router) { }

  ngOnInit(): void {
  }
  errorMsg:string='';
  successMsg:string='';
  hide=true;
  chide=true;
  usernameControl = new FormControl('', [Validators.required, Validators.pattern('^([a-z]){2}([0-9]){6}[dpm]$')]);
  passwordControl=new FormControl('',[Validators.required]);
  cpasswordControl=new FormControl('',[Validators.required]);
  indexControl=new FormControl('',[Validators.required, Validators.pattern('^([0-9]){4}\/([0-9]){4}$')]);
  imeControl=new FormControl('',[Validators.required]);
  prezimeControl=new FormControl('',[Validators.required]);
  tipControl=new FormControl('',[Validators.required]);
  username:string='';

  password:string='';
  cpassword:string='';
  index:string='';
  ime:string='';
  prezime:string='';
  tipStud:string='d';
  tipoviStudija: TipStudija[] = [
    {oznaka: 'd', naziv: 'Osnovne akademske'},
    {oznaka: 'm', naziv: 'Master akademske'},
    {oznaka: 'p', naziv: 'Doktorske'}
  ];

  getUsernameErrorMessage() {
    if(this.usernameControl.hasError('pattern')){
      return 'Nije oblika piGGBBBBx';
    }
    return this.usernameControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getPasswordErrorMessage() {
    return this.passwordControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getCpasswordErrorMessage() {
    return this.cpasswordControl.hasError('required') ? 'Ne može biti prazno' : '';
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

  register(){
    if(this.getUsernameErrorMessage()=='' && this.getPasswordErrorMessage()=='' && this.getPrezimeErrorMessage()=='' &&
       this.getImeErrorMessage()=='' && this.getIndexErrorMessage()=='' && this.getCpasswordErrorMessage()==''){
        if(this.cpassword!=this.password){
          this.successMsg='';
          this.errorMsg='Lozinke se ne poklapaju'
          return;
        }
        else{
          this.studentService.check(this.username).subscribe((student:Student)=>{
            if(!student){
              this.studentService.register(this.username, this.password, this.index, this.tipStud, this.ime, this.prezime).subscribe((student:Student)=>{
                if(!student){
                  this.successMsg='';
                  this.errorMsg = 'Greška!';
                  return;
                }
                else{
                  this.errorMsg='';
                  this.successMsg='Vaš nalog je kreiran';
                  return;
                }
              })
            }
            else{
              this.successMsg='';
              this.errorMsg='Već postoji nalog sa korisničkim imenom '+this.username;
              return;
            }
          })
        }
    }
    else{
      this.successMsg='';
      this.errorMsg='Nevalidni podaci!';
      return;
    }
  }
}
