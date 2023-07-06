import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/models/student.model';
import { Employee } from 'src/models/employee.model';
import { Admin } from 'src/models/admin.model';
import { StudentService } from 'src/services/student.service';
import { EmployeeService } from 'src/services/employee.service';
import { AdminService } from 'src/services/admin.service';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(private studentService:StudentService, private employeeService:EmployeeService, private adminService:AdminService,private router:Router) { }


  hide=true;
  usernameControl = new FormControl('', [Validators.required]);
  passwordControl=new FormControl('',[Validators.required]);
  username:string='';
  message:string='';
  password:string='';

  getUsernameErrorMessage() {
    return this.usernameControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getPasswordErrorMessage() {
    return this.passwordControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  deleteMessage(){
    this.message='';
  }

  login(){
    this.message='';
    if(!this.password || !this.username){
      this.message='Polja ne mogu biti prazna!';
      return;
    }

    if(this.username.includes("@student.etf.rs")){
      this.studentService.logIn(this.username, this.password).subscribe((student:Student)=>{
        if(!student){
          this.message = 'Neispravni podaci!';
        }
        else{
          localStorage.setItem('user', JSON.stringify(student.username));
          localStorage.setItem('type', 'student');
          if(this.username.substring(0,this.username.indexOf('@'))==this.password){
            this.router.navigate(['/opcije']);
          }
          else{
            window.location.reload();
          }
        }
      })
    }
    else{
      if(this.username.includes("@etf.bg.ac.rs")){
        this.employeeService.logIn(this.username, this.password).subscribe((employee:Employee)=>{
          if(!employee){
            this.message = 'Neispravni podaci!';
          }
          else{
            localStorage.setItem('user', JSON.stringify(employee.username));
            localStorage.setItem('type', 'employee');
            if(this.username.substring(0,this.username.indexOf('@'))==this.password){
              this.router.navigate(['/opcije']);
            }
            else{
              window.location.reload();
            }
          }
        })
      }
      else{
        this.adminService.logIn(this.username, this.password).subscribe((admin:Admin)=>{
          if(!admin){
            this.message = 'Neispravni podaci!';
          }
          else{
            localStorage.setItem('user', JSON.stringify(admin.username));
            localStorage.setItem('type', 'admin');
            window.location.reload();
          }
        })
      }
    }
  }
}
