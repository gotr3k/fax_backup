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
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-zaposleni-predmet-predavanja',
  templateUrl: './zaposleni-predmet-predavanja.component.html',
  styleUrls: ['./zaposleni-predmet-predavanja.component.css']
})
export class ZaposleniPredmetPredavanjaComponent implements OnInit {

  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
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
    this.fileService.getAllBySubjectAndType(this.subject.code,'P').subscribe((files:File[])=>{
      this.files=files;
      this.dataSource=new MatTableDataSource(this.files);
      this.dataSource.sort=this.sort;
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
  goToL(){
    this.router.navigate(['/zaposleniPredmetLab']);
  }
  goToD(){
    this.router.navigate(['/zaposleniPredmetProjekat']);
  }
  goToOb(){
    this.router.navigate(['/zaposleniPredmetObavestenja']);
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
    file.set('file',fileBlob,this.size+'*'+this.employeeFullName+'*'+this.subject.code+'*'+'P'+'*'+fileBlob.name);

    /* this.fileService.upload(this.employeeFullName,this.subject.code,file,'P').subscribe(response=>{
      console.log(response);
    }); */

    this.http.post('http://localhost:8080/api/files',file).subscribe(response=>{
      if(response){
        window.location.reload();
      }
      console.log(response);
    });
  }

  velicina(a:number,b:number=2){//vraca velicinu fajla, a je broj bajtova, b je broj decimalnih mesta
    if(0===a)
      return"0 B";
    const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));
    return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["B","KB","MB","GB","TB","PB","EB","ZB","YB"][d]
  }
  
  deleteFile(file:File){
   this.fileService.deleteFile(file.id)
  .pipe(
  mergeMap(()=>this.fileService.getAllBySubjectAndType(this.subject.code,'P'))
  ).subscribe((files:File[])=>{
  this.files=files;
  this.dataSource=new MatTableDataSource(this.files);
  this.dataSource.sort=this.sort;
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
