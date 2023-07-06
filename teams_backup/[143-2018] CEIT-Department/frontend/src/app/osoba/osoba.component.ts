import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from 'src/models/employee.model';
import { EmployeeAvatar } from 'src/models/employeeAvatar.model';
import { Subject } from 'src/models/subject.model';
import { SubjectEmployeeList } from 'src/models/subjectEmployeeList.model';
import { SubjectStudentList } from 'src/models/subjectStudentList.model';
import { EmployeeService } from 'src/services/employee.service';
import { EmployeeAvatarService } from 'src/services/employeeAvatar.service';
import { SubjectService } from 'src/services/subject.service';
import { SubjectEmployeeListService } from 'src/services/subjectEmployeeList.service';
import { SubjectStudentListService } from 'src/services/subjectStudentList.service';

interface Status{
  naziv:string;
  oznaka:number;
}

@Component({
  selector: 'app-osoba',
  templateUrl: './osoba.component.html',
  styleUrls: ['./osoba.component.css']
})
export class OsobaComponent implements OnInit {

  constructor(private subjectStudentListService: SubjectStudentListService,
              private subjectService: SubjectService,
              private subjectEmployeeListService:SubjectEmployeeListService,
              private employeeService:EmployeeService,
              private router:Router,
              private employeeAvatarService:EmployeeAvatarService) { }
  public mySubjectsList:SubjectStudentList[]=[];
  predmeti:Subject[]=[];
  subjectIds:number[]=[];
  osoba=<Employee>{};
  subjectEmployeeLists:SubjectEmployeeList[]=[];
  errorMsg:string='';
  imgSrc:any='';

  ngOnInit(): void {
    if(localStorage.getItem('type')=='student'){//potrebno da bi videli da li mozemo da pristupimo predmetu ili ne (dodati bolji interfejs)
      var username:string=JSON.parse(localStorage.getItem('user') || '{}');
      this.subjectStudentListService.getAllSubjectsOfStudent(username).subscribe((list:SubjectStudentList[])=>{
        this.mySubjectsList=list;
      });
    }
    
    if(localStorage.getItem('osoba')==null){
      this.router.navigate(['/zaposleni']);
    }
    this.osoba=JSON.parse(localStorage.getItem('osoba') || '{}');

    this.subjectEmployeeListService.getAllSubjectsOfEmployee(this.osoba.username).subscribe((list:SubjectEmployeeList[])=>{
      this.subjectEmployeeLists=list;
      this.subjectEmployeeLists.forEach(element=>{//punimo niz predmeta zaposlenog samo unique predmetima
        this.subjectService.getSubject(element.subjectId).subscribe((subject:Subject)=>{
          if(!this.subjectIds.includes(subject.id)){
            this.subjectIds.push(subject.id);
            this.predmeti.push(subject);
          }
        });
      });  
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    this.employeeAvatarService.getAllByEmployeeId(this.osoba.id).subscribe((employeeAvatar:EmployeeAvatar)=>{//ne radi!!!
      if(employeeAvatar){
        this.employeeAvatarService.display(employeeAvatar).subscribe(response=>{
          const reader=new FileReader();
          const img=new Image();
          img.src = window.URL.createObjectURL(response);
          img.onload=()=>{       
            reader.onload=e=>this.imgSrc=reader.result;
            //reader.readAsDataURL(response);
          }
        })
      }
    })
}

odsek(subject:Subject){
  switch(subject.department){
    case 1: return 'RTI';break;
    case 2: return 'SI';break;
    case 3: return 'Ostali';break;
    case 4: return 'Master';break;
    default: return '';break;
  }
}
  status(osoba:Employee){
    if(osoba.status==1){
      return 'Aktivan';
    }
    else{
      return 'Neaktivan';
    }
  }

  goTo(subject:Subject){
    var mySubject=false;
    if(this.mySubjectsList.length>0){ 
      this.mySubjectsList.forEach(element=>{
          if(subject.id==element.subjectId){
            mySubject=true;
          }
        });
    }
    if(localStorage.getItem('type')=='admin' || localStorage.getItem('type')=='employee' || (localStorage.getItem('type')=='student' && mySubject)){
      localStorage.setItem('predmet',JSON.stringify(subject));
      localStorage.setItem('lastPage','/osoba');//ako kliknemo back sa predmeta da se vratimo na ovu stranicu
      this.router.navigate(['/predmetObavestenja']);
    }
  }
}
