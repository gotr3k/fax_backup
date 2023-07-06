import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/models/employee.model';
import { EmployeeService } from 'src/services/employee.service';

interface Rank{
  naziv:string;
}
@Component({
  selector: 'app-admin-dodaj-zaposlenog',
  templateUrl: './admin-dodaj-zaposlenog.component.html',
  styleUrls: ['./admin-dodaj-zaposlenog.component.css']
})

export class AdminDodajZaposlenogComponent implements OnInit {

  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef;
  constructor(private employeeService:EmployeeService, private router:Router, private http:HttpClient) { }
  hide=true;
  chide=true;
  username:string='';
  password:string='';
  cpassword:string='';
  ime:string='';
  prezime:string='';
  rank:string='Redovni profesor';
  biography:string='';
  phone:string='';
  room:string='';
  website:string='';
  address:string='';
  errorMsg:string='';
  uploadErrMsg:string='';
  successMsg:string='';
  imageSrc:any='';
  fileName:string='';
  file=<FormData>{};
  ranks:Rank[]=[
    {naziv:'Redovni profesor'},
    {naziv:'Vanredni profesor'},
    {naziv:'Docent'},
    {naziv:'Asistent'},
    {naziv:'Saradnik u nastavi'},
    {naziv:'Istraživač'},
    {naziv:'Laboratorijski inženjer'},
    {naziv:'Laboratorijski tehničar'}
  ];
  usernameControl = new FormControl('', [Validators.required, Validators.pattern('^(([a-z])+\.?([a-z])+)+$')]);
  imeControl=new FormControl('',[Validators.required]);
  prezimeControl=new FormControl('',[Validators.required]);
  addressControl=new FormControl('',[Validators.required]);
  roomControl=new FormControl('',[Validators.required]);
  passwordControl=new FormControl('',[Validators.required]);
  cpasswordControl=new FormControl('',[Validators.required]);
  ngOnInit(): void {
    if(localStorage.getItem('type')!='admin'){
      this.router.navigate(['']);
    }
  }

  getUsernameErrorMessage() {
    if(this.usernameControl.hasError('pattern')){
      return 'Nedozvoljen oblik';
    }
    return this.usernameControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getPasswordErrorMessage() {
    return this.passwordControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getCpasswordErrorMessage() {
    return this.cpasswordControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getImeErrorMessage() {
    return this.imeControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getPrezimeErrorMessage() {
    return this.prezimeControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getAddressErrorMessage() {
    return this.addressControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getRoomErrorMessage() {
    return this.roomControl.hasError('required') ? 'Ne može biti prazno' : '';
  }
  
  deleteMessage(){
    this.errorMsg='';
    this.uploadErrMsg='';
    this.successMsg='';
  }

  addFile(){
    const reader=new FileReader();
    const fileBlob=this.fileInput.nativeElement.files[0];
    const  fileType = fileBlob['type'];
    const validImageTypes = ['image/jpeg', 'image/png'];
    if (!validImageTypes.includes(fileType)) {
      this.uploadErrMsg='Format mora biti jpeg ili png';
      this.imageSrc='';
      this.file=<FormData>{};
      this.fileName='';
    }
    else{
      const img=new Image();
      img.src = window.URL.createObjectURL(fileBlob);
      img.onload=()=>{
        if(img.width<=300 && img.height<=300){          
          reader.onload=e=>this.imageSrc=reader.result;
          reader.readAsDataURL(fileBlob);
          const file=new FormData();
          file.set('file',fileBlob,fileBlob.name);
          this.fileName=fileBlob.name;
          this.file=file;
          this.uploadErrMsg='';
        }
        else{
          this.uploadErrMsg='Maksimalna veličina mora biti 300x300';
          this.imageSrc='';
          this.fileName='';
          this.file=<FormData>{};
        }
      }  
    }
  }

  register(){
    if(this.getUsernameErrorMessage()=='' && this.getPasswordErrorMessage()=='' && this.getPrezimeErrorMessage()=='' &&
       this.getImeErrorMessage()=='' && this.getAddressErrorMessage()=='' && this.getCpasswordErrorMessage()=='' && this.getRoomErrorMessage()=='' && this.uploadErrMsg==''){
        if(this.cpassword!=this.password){
          this.successMsg='';
          this.errorMsg='Lozinke se ne poklapaju'
          return;
        }
        else{
          this.employeeService.check(this.username).subscribe((employee:Employee)=>{
            if(!employee){
              this.employeeService.register(this.username, this.password, this.ime, this.prezime, this.rank, this.phone, this.address, this.website, this.biography, this.room).subscribe((employee:Employee)=>{
                if(!employee){
                  this.successMsg='';
                  this.errorMsg = 'Greška!';
                  return;
                }
                else{
                  if(typeof this.file === 'object'){//ako fajl nije null
                    const entry=this.file.get('file');//uzimamo unos iz fajla
                    if(entry!=null){
                      const newFile=new FormData();
                      newFile.set('file',entry,employee.id+'*'+this.fileName);
                      this.http.post('http://localhost:8080/api/employeeAvatars',newFile).subscribe(response=>{
                      console.log(response);
                      });    
                    }   
                  }   
                  this.errorMsg='';
                  this.successMsg='Nalog zaposlenog je kreiran';
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
