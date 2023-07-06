import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/models/employee.model';
import { Subject } from 'src/models/subject.model';
import { File } from 'src/models/file.model';
import { EmployeeService } from 'src/services/employee.service';
import { FileService } from 'src/services/file.service';
import { mergeMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-zaposleni-predmet-vezbe',
  templateUrl: './zaposleni-predmet-vezbe.component.html',
  styleUrls: ['./zaposleni-predmet-vezbe.component.css']
})
export class ZaposleniPredmetVezbeComponent implements OnInit {

  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef;

  constructor(private router:Router, private http:HttpClient, private fileService:FileService, private employeeService:EmployeeService) { }

  subject=<Subject>{};
  employeeFullName:string='';
  files:File[]=[];
  size:number=0;
  public columns=['name','employee', 'size', 'date','delete'];
  dataSource=new MatTableDataSource(this.files);
  ngOnInit(): void {
    this.subject=JSON.parse(localStorage.getItem('predmet') || '{}');
    var usr=JSON.parse(localStorage.getItem('user') || '{}');
    this.employeeService.check(usr).subscribe((employee:Employee)=>{
      if(employee){
        this.employeeFullName=employee.name+" "+employee.surname;
      }
    });
    this.fileService.getAllBySubjectAndType(this.subject.code,'V').subscribe((files:File[])=>{
      this.files=files;
      this.dataSource=new MatTableDataSource(this.files);
    })
  }

  goToO(){
    this.router.navigate(['/zaposleniPredmetO']);
  }
  goToP(){
    this.router.navigate(['/zaposleniPredmetPredavanja']);
  }
  goToV(){
    this.router.navigate(['/zaposleniPredmetVezbe']);
  }
  goToI(){
    this.router.navigate(['/zaposleniPredmetPitanja']);
  }
  goToOb(){
    this.router.navigate(['/zaposleniPredmetObavestenja']);
  }
  goToL(){
    this.router.navigate(['/zaposleniPredmetLab']);
  }
  goToD(){
    this.router.navigate(['/zaposleniPredmetProjekat']);
  }
  goToS(){
    this.router.navigate(['zaposleniSpiskovi'])
  }
  back(){
    this.router.navigate(['/zaposleniPredmeti']);
  }

  fileUpload(){
    const fileBlob=this.fileInput.nativeElement.files[0];
    const file=new FormData();
    this.size=this.fileInput.nativeElement.files[0].size;
    file.set('file',fileBlob,this.size+'*'+this.employeeFullName+'*'+this.subject.code+'*'+'V'+'*'+fileBlob.name);


    this.http.post('http://localhost:8080/api/files',file).subscribe(response=>{
      if(response){
        window.location.reload();
      }
      console.log(response);
    });
  }

  velicina(a:number,b:number=2){
    if(0===a)
      return"0 B";
    const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));
    return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["B","KB","MB","GB","TB","PB","EB","ZB","YB"][d]
  }

  deleteFile(file:File){
   this.fileService.deleteFile(file.id)
  .pipe(
  mergeMap(()=>this.fileService.getAllBySubjectAndType(this.subject.code,'V'))
  ).subscribe((files:File[])=>{
  this.files=files;
  this.dataSource=new MatTableDataSource(this.files);
  //window.location.reload();
  },
  (error:ErrorEvent)=>{
  console.log(error);
  });
  }

  download(file:File){
    console.log(file.filePath);
    this.fileService.download(file);
  }
}
