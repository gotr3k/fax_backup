import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'src/models/subject.model';
import { SubjectService } from 'src/services/subject.service';
import { mergeMap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressSpinner } from '@angular/material/progress-spinner'
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SubjectEmployeeListService } from 'src/services/subjectEmployeeList.service';
import { SubjectStudentListService } from 'src/services/subjectStudentList.service';

@Component({
  selector: 'app-admin-predmeti',
  templateUrl: './admin-predmeti.component.html',
  styleUrls: ['./admin-predmeti.component.css']
})
export class AdminPredmetiComponent implements OnInit, AfterViewInit {
  public loading=true;
  public subjects11: Subject[] = [];  //po jedan niz predmeta za svaki semestar
  public subjects12: Subject[] = [];
  public subjects21: Subject[] = [];
  public subjects22: Subject[] = [];
  public subjects31: Subject[] = [];
  public subjects32: Subject[] = [];
  public subjects41: Subject[] = [];
  public subjects42: Subject[] = [];
  public subjects51: Subject[] = [];
  public subjects52: Subject[] = [];
  public errorMsg:string='';
  public successMsg:string='';
  public columns=['code','name','department','type','espb', 'slu', 'ang','update','delete'];
  dataSource11=new MatTableDataSource(this.subjects11); //za svaku tabelu postavljamo jedan niz kao izvor podataka
  dataSource12=new MatTableDataSource(this.subjects12);
  dataSource21=new MatTableDataSource(this.subjects21);
  dataSource22=new MatTableDataSource(this.subjects22);
  dataSource31=new MatTableDataSource(this.subjects31);
  dataSource32=new MatTableDataSource(this.subjects32);
  dataSource41=new MatTableDataSource(this.subjects41);
  dataSource42=new MatTableDataSource(this.subjects42);
  dataSource51=new MatTableDataSource(this.subjects51);
  dataSource52=new MatTableDataSource(this.subjects52);

  constructor(private subjectEmployeeListService:SubjectEmployeeListService, private subjectStudentListService:SubjectStudentListService, private subjectService:SubjectService, private router:Router) { }

  
  @ViewChild(MatSort) sort11!: MatSort;
  @ViewChild(MatSort) sort12!: MatSort; //videti zasto ne rade ostali sortovi 
  @ViewChild(MatSort) sort21!: MatSort;
  @ViewChild(MatSort) sort22!: MatSort;
  @ViewChild(MatSort) sort31!: MatSort;
  @ViewChild(MatSort) sort32!: MatSort;
  @ViewChild(MatSort) sort41!: MatSort;
  @ViewChild(MatSort) sort42!: MatSort;
  @ViewChild(MatSort) sort51!: MatSort;
  @ViewChild(MatSort) sort52!: MatSort;

  ngOnInit(): void {
    localStorage.removeItem('subject');
    if(localStorage.getItem('type')!='admin'){
      this.router.navigate(['']);
    }

    this.subjectService.getAllSubjectsSemester(1).subscribe((subjects:Subject[])=>{
      this.subjects11=subjects;
      this.dataSource11 = new MatTableDataSource(this.subjects11);
      this.dataSource11.sort=this.sort11;
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    this.subjectService.getAllSubjectsSemester(2).subscribe((subjects:Subject[])=>{
      this.subjects12=subjects;
      this.dataSource12 = new MatTableDataSource(this.subjects12);
      this.dataSource12.sort=this.sort12;
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    this.subjectService.getAllSubjectsSemester(3).subscribe((subjects:Subject[])=>{
      this.subjects21=subjects;
      this.dataSource21 = new MatTableDataSource(this.subjects21);
      this.dataSource21.sort=this.sort21;
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    this.subjectService.getAllSubjectsSemester(4).subscribe((subjects:Subject[])=>{
      this.subjects22=subjects;
      this.dataSource22 = new MatTableDataSource(this.subjects22);
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    this.subjectService.getAllSubjectsSemester(5).subscribe((subjects:Subject[])=>{
      this.subjects31=subjects;
      this.dataSource31 = new MatTableDataSource(this.subjects31);
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    this.subjectService.getAllSubjectsSemester(6).subscribe((subjects:Subject[])=>{
      this.subjects32=subjects;
      this.dataSource32 = new MatTableDataSource(this.subjects32);
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    this.subjectService.getAllSubjectsSemester(7).subscribe((subjects:Subject[])=>{
      this.subjects41=subjects;
      this.dataSource41 = new MatTableDataSource(this.subjects41);
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });

    this.subjectService.getAllSubjectsSemester(8).subscribe((subjects:Subject[])=>{
      this.subjects42=subjects;
      this.dataSource42 = new MatTableDataSource(this.subjects42);
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });


    this.subjectService.getAllSubjectsSemester(9).subscribe((subjects:Subject[])=>{
      this.subjects51=subjects;
      this.dataSource51 = new MatTableDataSource(this.subjects51);
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });


    this.subjectService.getAllSubjectsSemester(10).subscribe((subjects:Subject[])=>{
      this.subjects52=subjects;
      this.dataSource52 = new MatTableDataSource(this.subjects52);
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });
    this.loading=false;
  }

  ngAfterViewInit() {
    this.dataSource11.sort = this.sort11;
    this.dataSource12.sort = this.sort12;
    this.dataSource21.sort = this.sort21;
    this.dataSource22.sort = this.sort22;
    this.dataSource31.sort = this.sort31;
    this.dataSource32.sort = this.sort32;
    this.dataSource41.sort = this.sort41;
    this.dataSource42.sort = this.sort42;
    this.dataSource51.sort = this.sort51;
    this.dataSource52.sort = this.sort52;
  }

  tip(subject:Subject){
    if(subject.type==1){
      return 'Obavezan';
    }
    else{
      if(subject.type==2){
        return 'Izborni';
      }
      else{
        return '';
      }
    }
  }

  odsek(subject:Subject){
    switch(subject.department){
      case 1: return 'RTI'; break;
      case 2: return 'SI'; break;
      case 3: return 'Ostali'; break;
      case 4: return 'Master'; break;
      default: return ''; break; 
    }
  }

  addSubject(){
    this.router.navigate(['/adminDodajPredmet']);
  }

  deleteAllSubjects(){ //Ne radi
    /* this.subjectService.deleteAllSubjects();
    window.location.reload(); */

    /* forkJoin([this.subjectService.deleteAllSubjects(),this.subjectEmployeeListService.deleteAll(), this.subjectStudentListService.deleteAll()]).pipe(
      mergeMap(()=>[
        this.subjectService.getAllSubjectsSemester(1),
        this.subjectService.getAllSubjectsSemester(2),
        this.subjectService.getAllSubjectsSemester(3),
        this.subjectService.getAllSubjectsSemester(4),
        this.subjectService.getAllSubjectsSemester(5),
        this.subjectService.getAllSubjectsSemester(6),
        this.subjectService.getAllSubjectsSemester(7),
        this.subjectService.getAllSubjectsSemester(8),
        this.subjectService.getAllSubjectsSemester(9),
        this.subjectService.getAllSubjectsSemester(10)
      ])
    ).subscribe(([subjects11:Subject[], subjects12:Subject[],subjects21:Subject[], subjects22:Subject[],
      subjects31:Subject[], subjects32:Subject[],subjects41:Subject[], subjects42:Subject[],subjects61:Subject[], subjects62:Subject[]])=>{
      window.location.reload();
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    }); */

  }

  ang(subject:Subject){
    localStorage.setItem('subject', JSON.stringify(subject));
    this.router.navigate(['/planAngazovanja']);
  }

  slu(subject:Subject){
    localStorage.setItem('subject', JSON.stringify(subject));
    this.router.navigate(['/planSlusanja']);
    
  }

  updateSubject(subject:Subject){
    localStorage.setItem('subject', JSON.stringify(subject));
    this.router.navigate(['/adminAzurirajPredmet']);
  }

  deleteSubject(subject:Subject){//dodati dijalog
    
    switch(subject.semester){
      case 1:{
        forkJoin([this.subjectService.deleteSubject(subject.id),
                  this.subjectStudentListService.deleteBySubject(subject.id),
                  this.subjectEmployeeListService.deleteBySubject(subject.id)])
          .pipe(
          mergeMap(()=>this.subjectService.getAllSubjectsSemester(1))
          ).subscribe((subjects:Subject[])=>{
          this.subjects11=subjects;
          this.dataSource11=new MatTableDataSource(this.subjects11);
          this.dataSource11.sort=this.sort11;
          },
          (error:ErrorEvent)=>{
          this.errorMsg=error.error.message;
          });

        /* this.subjectService.deleteSubject(subject.id)
        .pipe(
        mergeMap(()=>this.subjectService.getAllSubjectsSemester(1))
        ).subscribe((subjects:Subject[])=>{
        this.subjects11=subjects;
        window.location.reload();
        },
        (error:ErrorEvent)=>{
        this.errorMsg=error.error.message;
        }); */


        break;
      }
      case 2:{
        forkJoin([this.subjectService.deleteSubject(subject.id),
          this.subjectStudentListService.deleteBySubject(subject.id),
          this.subjectEmployeeListService.deleteBySubject(subject.id)])
          .pipe(
          mergeMap(()=>this.subjectService.getAllSubjectsSemester(2))
          ).subscribe((subjects:Subject[])=>{
          this.subjects12=subjects;
          this.dataSource12=new MatTableDataSource(this.subjects12);
          this.dataSource11.sort=this.sort12;
        },
        (error:ErrorEvent)=>{
        this.errorMsg=error.error.message;
        });
        /* this.subjectService.deleteSubject(subject.id)
        .pipe(
        mergeMap(()=>this.subjectService.getAllSubjectsSemester(2))
        ).subscribe((subjects:Subject[])=>{
        this.subjects12=subjects;
        window.location.reload();
        },
        (error:ErrorEvent)=>{
        this.errorMsg=error.error.message;
        }); */
        break;
      }
      case 3:{
        forkJoin([this.subjectService.deleteSubject(subject.id),
          this.subjectStudentListService.deleteBySubject(subject.id),
          this.subjectEmployeeListService.deleteBySubject(subject.id)])
          .pipe(
          mergeMap(()=>this.subjectService.getAllSubjectsSemester(3))
          ).subscribe((subjects:Subject[])=>{
          this.subjects21=subjects;
          this.dataSource21=new MatTableDataSource(this.subjects21);
          },
          (error:ErrorEvent)=>{
          this.errorMsg=error.error.message;
          });
        /* this.subjectService.deleteSubject(subject.id)
        .pipe(
        mergeMap(()=>this.subjectService.getAllSubjectsSemester(3))
        ).subscribe((subjects:Subject[])=>{
        this.subjects21=subjects;
        window.location.reload();
        },
        (error:ErrorEvent)=>{
        this.errorMsg=error.error.message;
        }); */
        break;
      }
      case 4:{
        forkJoin([this.subjectService.deleteSubject(subject.id),
          this.subjectStudentListService.deleteBySubject(subject.id),
          this.subjectEmployeeListService.deleteBySubject(subject.id)])
          .pipe(
          mergeMap(()=>this.subjectService.getAllSubjectsSemester(4))
          ).subscribe((subjects:Subject[])=>{
          this.subjects22=subjects;
          this.dataSource22=new MatTableDataSource(this.subjects22);
          },
          (error:ErrorEvent)=>{
          this.errorMsg=error.error.message;
          });
        /* this.subjectService.deleteSubject(subject.id)
        .pipe(
        mergeMap(()=>this.subjectService.getAllSubjectsSemester(4))
        ).subscribe((subjects:Subject[])=>{
        this.subjects22=subjects;
        window.location.reload();
        },
        (error:ErrorEvent)=>{
        this.errorMsg=error.error.message;
        }); */
        break;
      }
      case 5:{
        forkJoin([this.subjectService.deleteSubject(subject.id),
          this.subjectStudentListService.deleteBySubject(subject.id),
          this.subjectEmployeeListService.deleteBySubject(subject.id)])
  .pipe(
  mergeMap(()=>this.subjectService.getAllSubjectsSemester(5))
  ).subscribe((subjects:Subject[])=>{
  this.subjects31=subjects;
  window.location.reload();
  },
  (error:ErrorEvent)=>{
  this.errorMsg=error.error.message;
  });
        /* this.subjectService.deleteSubject(subject.id)
        .pipe(
        mergeMap(()=>this.subjectService.getAllSubjectsSemester(5))
        ).subscribe((subjects:Subject[])=>{
        this.subjects31=subjects;
        window.location.reload();
        },
        (error:ErrorEvent)=>{
        this.errorMsg=error.error.message;
        }); */
        break;
      }
      case 6:{
        forkJoin([this.subjectService.deleteSubject(subject.id),
          this.subjectStudentListService.deleteBySubject(subject.id),
          this.subjectEmployeeListService.deleteBySubject(subject.id)])
          .pipe(
          mergeMap(()=>this.subjectService.getAllSubjectsSemester(6))
          ).subscribe((subjects:Subject[])=>{
          this.subjects32=subjects;
          this.dataSource32=new MatTableDataSource(this.subjects32);
          },
          (error:ErrorEvent)=>{
          this.errorMsg=error.error.message;
          });
        /* this.subjectService.deleteSubject(subject.id)
        .pipe(
        mergeMap(()=>this.subjectService.getAllSubjectsSemester(6))
        ).subscribe((subjects:Subject[])=>{
        this.subjects32=subjects;
        window.location.reload();
        },
        (error:ErrorEvent)=>{
        this.errorMsg=error.error.message;
        }); */
        break;
      }
      case 7:{
        forkJoin([this.subjectService.deleteSubject(subject.id),
          this.subjectStudentListService.deleteBySubject(subject.id),
          this.subjectEmployeeListService.deleteBySubject(subject.id)])
          .pipe(
          mergeMap(()=>this.subjectService.getAllSubjectsSemester(7))
          ).subscribe((subjects:Subject[])=>{
          this.subjects41=subjects;
          this.dataSource41=new MatTableDataSource(this.subjects41);
          },
          (error:ErrorEvent)=>{
          this.errorMsg=error.error.message;
          });
        /* this.subjectService.deleteSubject(subject.id)
        .pipe(
        mergeMap(()=>this.subjectService.getAllSubjectsSemester(7))
        ).subscribe((subjects:Subject[])=>{
        this.subjects41=subjects;
        window.location.reload();
        },
        (error:ErrorEvent)=>{
        this.errorMsg=error.error.message;
        }); */
        break;
      }
      case 8:{
        forkJoin([this.subjectService.deleteSubject(subject.id),
          this.subjectStudentListService.deleteBySubject(subject.id),
          this.subjectEmployeeListService.deleteBySubject(subject.id)])
          .pipe(
          mergeMap(()=>this.subjectService.getAllSubjectsSemester(8))
          ).subscribe((subjects:Subject[])=>{
          this.subjects42=subjects;
          this.dataSource42=new MatTableDataSource(this.subjects42);
          },
          (error:ErrorEvent)=>{
          this.errorMsg=error.error.message;
          });
        /* this.subjectService.deleteSubject(subject.id)
        .pipe(
        mergeMap(()=>this.subjectService.getAllSubjectsSemester(8))
        ).subscribe((subjects:Subject[])=>{
        this.subjects42=subjects;
        window.location.reload();
        },
        (error:ErrorEvent)=>{
        this.errorMsg=error.error.message;
        }); */
        break;
      }
      case 9:{
        forkJoin([this.subjectService.deleteSubject(subject.id),
          this.subjectStudentListService.deleteBySubject(subject.id),
          this.subjectEmployeeListService.deleteBySubject(subject.id)])
          .pipe(
          mergeMap(()=>this.subjectService.getAllSubjectsSemester(9))
          ).subscribe((subjects:Subject[])=>{
          this.subjects51=subjects;
          this.dataSource51=new MatTableDataSource(this.subjects51);
          },
          (error:ErrorEvent)=>{
          this.errorMsg=error.error.message;
          });
        /* this.subjectService.deleteSubject(subject.id)
        .pipe(
        mergeMap(()=>this.subjectService.getAllSubjectsSemester(9))
        ).subscribe((subjects:Subject[])=>{
        this.subjects51=subjects;
        window.location.reload();
        },
        (error:ErrorEvent)=>{
        this.errorMsg=error.error.message;
        }); */
        break;
      }
      case 10:{
        forkJoin([this.subjectService.deleteSubject(subject.id),
          this.subjectStudentListService.deleteBySubject(subject.id),
          this.subjectEmployeeListService.deleteBySubject(subject.id)])
          .pipe(
          mergeMap(()=>this.subjectService.getAllSubjectsSemester(10))
          ).subscribe((subjects:Subject[])=>{
          this.subjects52=subjects;
          this.dataSource52=new MatTableDataSource(this.subjects52);
          },
          (error:ErrorEvent)=>{
          this.errorMsg=error.error.message;
          });
        /* this.subjectService.deleteSubject(subject.id)
        .pipe(
        mergeMap(()=>this.subjectService.getAllSubjectsSemester(10))
        ).subscribe((subjects:Subject[])=>{
        this.subjects52=subjects;
        window.location.reload();
        },
        (error:ErrorEvent)=>{
        this.errorMsg=error.error.message;
        }); */
        break;
      }
    }
  }
}