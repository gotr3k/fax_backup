import { HttpClient } from '@angular/common/http';
import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { Employee } from 'src/models/employee.model';
import { EmployeeService } from 'src/services/employee.service';
import { EmployeeAvatarService } from 'src/services/employeeAvatar.service';

interface Rank{
  naziv:string;
}

interface Status{
  naziv:string;
  oznaka:number;
}
@Component({
  selector: 'app-admin-azuriraj-zaposlenog',
  templateUrl: './admin-azuriraj-zaposlenog.component.html',
  styleUrls: ['./admin-azuriraj-zaposlenog.component.css']
})

export class AdminAzurirajZaposlenogComponent implements OnInit {
  
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef;

  constructor(private employeeService:EmployeeService, private router:Router, private http:HttpClient, private employeeAvatarService:EmployeeAvatarService) { }

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
  uploadErrMsg:string='';
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
  statusi:Status[]=[
    {naziv:'Aktivan', oznaka:1},
    {naziv:'Neaktivan',oznaka:0}
  ];
  usernameControl = new FormControl('', [Validators.required]);
  imeControl=new FormControl('',[Validators.required]);
  prezimeControl=new FormControl('',[Validators.required]);
  addressControl=new FormControl('',[Validators.required]);
  roomControl=new FormControl('',[Validators.required]);

  ngOnInit(): void {
    if(localStorage.getItem('type')!='admin'){
      this.router.navigate(['']);
    }
    if(localStorage.getItem('employee')==null){
      this.router.navigate(['/adminZaposleni']);
    }
    var employee:Employee=JSON.parse(localStorage.getItem('employee') || '{}');
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
  }
  getUsernameErrorMessage() {
    return this.usernameControl.hasError('required') ? 'Ne može biti prazno' : '';
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
    this.successMsg='';
  }

  addFile(){//dodajemo sliku u promenljivu
    const reader=new FileReader();
    const fileBlob=this.fileInput.nativeElement.files[0];
    const  fileType = fileBlob['type'];
    const validImageTypes = ['image/jpeg', 'image/png']; //provera da li je uploadovani fajl slika
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
        if(img.width<=300 && img.height<=300){     //max velicina slike je 300x300     
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

  update(){
    if(this.getUsernameErrorMessage()=='' && this.getPrezimeErrorMessage()=='' &&
       this.getImeErrorMessage()=='' && this.getRoomErrorMessage()=='' && this.getAddressErrorMessage()=='' && this.uploadErrMsg==''){
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
            localStorage.setItem('employee', JSON.stringify(emp));
            this.errorMsg='';
            this.successMsg='Zaposleni je ažuriran';
            if(typeof this.file === 'object'){//ako fajl nije null              OVAJ DEO NE RADI?!?!?
              const entry=this.file.get('file');//uzimamo unos iz fajla
              if(entry!=null){
                const newFile=new FormData();
                newFile.set('file',entry,employee.id+'*'+this.fileName);
                this.employeeAvatarService.deleteFilesByEmployeeId(this.id).pipe(
                  mergeMap(()=>this.employeeAvatarService.upload(newFile))
                ).subscribe(response=>{
                  console.log('uploadovan');
                });              
               /*  .subscribe(response=>{
                      console.log('brisemo avatara');
                      console.log('uploadujemo avatara');
                      const newFile=new FormData();
                      newFile.set('file',entry,employee.id+'*'+this.fileName);
                      this.http.post('http://localhost:8080/api/employeeAvatars',newFile).subscribe(response=>{
                        console.log('uploadovan');
                      });
                }); */
                
                
              }   
            }
            return;
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
