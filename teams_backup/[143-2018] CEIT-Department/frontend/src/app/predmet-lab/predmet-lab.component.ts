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
  selector: 'app-predmet-lab',
  templateUrl: './predmet-lab.component.html',
  styleUrls: ['./predmet-lab.component.css']
})
export class PredmetLabComponent implements OnInit {

  constructor(private router:Router, private http:HttpClient, private fileService:FileService, private employeeService:EmployeeService) { }

  subject=<Subject>{};
  employeeFullName:string='';
  files:File[]=[];
  size:number=0;
  public columns=['fileName','employeeFullName', 'fileSize', 'uploadDate'];
  dataSource=new MatTableDataSource(this.files);
  @ViewChild(MatSort) sort!:MatSort;//ne radi?!

  ngAfterViewInit() {//ne radi?!
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.subject=JSON.parse(localStorage.getItem('predmet') || '{}');
    if(!this.subject.labVisible){
      this.router.navigate(['predmetInformacije']);
    }
    var usr=JSON.parse(localStorage.getItem('user') || '{}');
    this.fileService.getAllBySubjectAndType(this.subject.code,'L').subscribe((files:File[])=>{
      this.files=files;
      this.dataSource=new MatTableDataSource(this.files);
    })
  }

  goToO(){
    this.router.navigate(['/predmetInformacije']);
  }
  goToP(){
    this.router.navigate(['/predmetPredavanja']);
  }
  goToV(){
    this.router.navigate(['/predmetVezbe']);
  }
  goToI(){
    this.router.navigate(['/predmetPitanja']);
  }
  goToOb(){
    this.router.navigate(['/predmetObavestenja']);
  }
  goToL(){
    this.router.navigate(['/predmetLab']);
  }
  goToD(){
    this.router.navigate(['/predmetProjekat']);
  }
  goToS(){
    this.router.navigate(['/predmetSpisak']);
  }
  back(){
    this.router.navigate([localStorage.getItem('lastPage')]);
  }

  velicina(a:number,b:number=2){
    if(0===a)
      return"0 B";
    const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));
    return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["B","KB","MB","GB","TB","PB","EB","ZB","YB"][d]
  }

  download(file:File){
    console.log(file.filePath);
    this.fileService.download(file);
  }
}