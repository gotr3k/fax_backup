import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/models/student.model';
import { StudentService } from 'src/services/student.service';
import { Employee } from 'src/models/employee.model';
import { EmployeeService } from 'src/services/employee.service';
import { Admin } from 'src/models/admin.model';
import { AdminService } from 'src/services/admin.service';

@Component({
  selector: 'app-opcije',
  templateUrl: './opcije.component.html',
  styleUrls: ['./opcije.component.css']
})
export class OpcijeComponent implements OnInit, OnDestroy {

  constructor(private studentService:StudentService, private router:Router,private employeeService:EmployeeService,private adminService:AdminService) { }

  errorMsg:string='';
  successMsg:string='';
  hintMsg:string='';
  hide=true;
  chide=true;
  oldhide=true;
  oldPasswordControl=new FormControl('',[Validators.required]);
  passwordControl=new FormControl('',[Validators.required]);
  cpasswordControl=new FormControl('',[Validators.required]);
  type:string='';
  username:string='';
  password:string='';
  cpassword:string='';
  oldPassword:string='';
  ngOnInit(): void {
    localStorage.removeItem('lastPage');
    localStorage.removeItem('osoba');
    this.username=JSON.parse(localStorage.getItem('user') || '{}');
    switch(localStorage.getItem('type')){
      case 'student': {
        this.type='student';
        this.username=this.username.substring(0,9);
        this.studentService.check(this.username).subscribe((student:Student)=>{
          if(student.password==this.username){
            this.hintMsg='Obavezna promena lozinke';
          }
        });
        break;
      }
      case 'employee':{
        this.type='employee';
        this.employeeService.check(this.username).subscribe((employee:Employee)=>{
          if(employee.password==this.username.substring(0,this.username.indexOf('@'))){
            this.hintMsg='Obavezna promena lozinke';
          }
        });
        break;
      }
      case 'admin': this.type='admin';break;
      default: this.router.navigate(['']); break;
    }
    
  }

  ngOnDestroy():void{//nije dozvoljeno napustiti stranicu dok se ne promeni sifra prvi put
    if(this.type=='student'){
      this.studentService.check(this.username).subscribe((student:Student)=>{
        if(student.password==this.username){
          this.router.navigate(['/opcije']);
        }
      });
    }
    else{
      if(this.type=='employee'){
        this.employeeService.check(this.username).subscribe((employee:Employee)=>{
          if(employee.password==this.username.substring(0,this.username.indexOf('@'))){
            this.router.navigate(['/opcije']);
          }
        });
      }
    }
  }


  getPasswordErrorMessage() {
    return this.passwordControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getCpasswordErrorMessage() {
    return this.cpasswordControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getOldPasswordErrorMessage() {
    return this.oldPasswordControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  deleteMessage(){
    this.errorMsg='';
    this.successMsg='';
  }

  saveChanges(){
    if( this.getPasswordErrorMessage()=='' &&  this.getCpasswordErrorMessage()=='' &&  this.getOldPasswordErrorMessage()==''){
        if(this.cpassword!=this.password){
          this.successMsg='';
          this.errorMsg='Lozinke se ne poklapaju'
          return;
        }
        else{
          if(this.password==this.oldPassword){
            this.successMsg='';
            this.errorMsg='Lozinke ne mogu biti iste'
            return;
          }

          switch(this.type){
            case 'student':{
              this.studentService.check(this.username).subscribe((student1:Student)=>{
                if(!student1){                 
                  this.successMsg='';
                  this.errorMsg='Ne postoji nalog sa korisničkim imenom '+this.username;
                  return;
                }
                else{
                  if(student1.password==this.oldPassword){
                  this.studentService.updateStudentWithPass(student1.id, this.username, this.password, student1.index, student1.type, student1.name, student1.surname, student1.status).subscribe((student2:Student)=>{
                    if(!student2){
                      this.successMsg='';
                      this.errorMsg = 'Greška!';
                      return;
                    }
                    else{
                      this.errorMsg='';
                      this.successMsg='Lozinka je sačuvana';
                      localStorage.removeItem('user');
                      localStorage.removeItem('type');
                      this.router.navigate(['']);
                      return;
                    }
                  })
                }
                else{
                  this.successMsg='';
                  this.errorMsg='Stara lozinka nije ispravna';
                  return;
                }

                }
              })
              break;
            };
            case 'employee':{
              this.employeeService.check(this.username).subscribe((employee1:Employee)=>{
                if(!employee1){                 
                  this.successMsg='';
                  this.errorMsg='Ne postoji nalog sa korisničkim imenom '+this.username;
                  return;
                }
                else{
                  if(employee1.password==this.oldPassword){
                  this.employeeService.updateEmployeeWithPass(employee1.id, this.username, this.password, employee1.name, employee1.surname, employee1.rank, employee1.phone, employee1.address, employee1.website, employee1.biography, employee1.room, employee1.status).subscribe((employee2:Employee)=>{
                    if(!employee2){
                      this.successMsg='';
                      this.errorMsg = 'Greška!';
                      return;
                    }
                    else{
                      this.errorMsg='';
                      this.successMsg='Lozinka je sačuvana';
                      localStorage.removeItem('user');
                      localStorage.removeItem('type');
                      this.router.navigate(['']);
                      return;
                    }
                  })
                }
                else{
                  this.successMsg='';
                  this.errorMsg='Stara lozinka nije ispravna';
                  return;
                }

                }
              });
              break;
            }
          }
        }
    }
    else{
      this.successMsg='';
      this.errorMsg='Nevalidni podaci!';
      return;
    }
  }

}