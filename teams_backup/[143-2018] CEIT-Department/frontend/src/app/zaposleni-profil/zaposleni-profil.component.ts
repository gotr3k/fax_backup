import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/models/employee.model';
import { EmployeeService } from 'src/services/employee.service';


@Component({
  selector: 'app-zaposleni-profil',
  templateUrl: './zaposleni-profil.component.html',
  styleUrls: ['./zaposleni-profil.component.css']
})
export class ZaposleniProfilComponent implements OnInit {

  id:number=0;
  username:string='';
  password:string='';
  ime:string='';
  prezime:string='';
  rank:string='';
  biography:string='';
  phone:string='';
  room:string='';
  website:string='';
  address:string='';
  status:number=0;
  errorMsg:string='';
  successMsg:string='';
  addressControl=new FormControl('',[Validators.required]);
  roomControl=new FormControl('',[Validators.required]);
  constructor(private employeeService:EmployeeService, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('type')!='employee'){
      this.router.navigate(['']);
    }
    var username:string=JSON.parse(localStorage.getItem('user') || '{}');
    this.employeeService.check(username).subscribe((employee:Employee)=>{
      this.id=employee.id;
      this.username=employee.username;
      this.password=employee.password;
      this.ime=employee.name;
      this.prezime=employee.surname;
      this.rank=employee.rank;
      this.biography=employee.biography;
      this.room=employee.room;
      this.address=employee.address;
      this.phone=employee.phone;
      this.website=employee.website;
      this.status=employee.status;
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });
  }

  getAddressErrorMessage() {
    return this.addressControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getRoomErrorMessage() {
    return this.roomControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  deleteMessage(){
    this.errorMsg='';
    this.successMsg='';
  }

  update(){
    if(this.getRoomErrorMessage()=='' && this.getAddressErrorMessage()==''){
        this.employeeService.updateEmployee(this.id, this.username, this.ime, this.prezime, this.rank, this.phone, this.address, this.website, this.biography, this.room, this.status).subscribe((employee:Employee)=>{
          if(!employee){
            this.successMsg='';
            this.errorMsg = 'Greška!';
            return;
          }
          else{
            var emp:Employee={
              id:this.id,
              username:this.username,
              password:this.password,
              name:this.ime,
              surname:this.prezime,
              rank:this.rank,
              biography:this.biography,
              room:this.room,
              address:this.address,
              phone:this.phone,
              website:this.website,
              status:this.status
            }
            this.errorMsg='';
            this.successMsg='Izmene su sačuvane';
            return;
          }
        })

    }
    else{
      this.successMsg='';
      this.errorMsg='Nevispravni podaci!';
      return;
    }
  }
}
