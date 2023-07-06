import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { Notice } from 'src/models/notice.model';
import { NoticeService } from 'src/services/notice.service';

interface Kat{
  name:string,
  value:number
}

@Component({
  selector: 'app-obavestenja',
  templateUrl: './obavestenja.component.html',
  styleUrls: ['./obavestenja.component.css']
})
export class ObavestenjaComponent implements OnInit {

  constructor(private noticeService:NoticeService,private router:Router) { }
  notices:Notice[]=[];
  errorMsg:string='';
  type:string='';
  ngOnInit(): void {
    localStorage.removeItem('notice');
    this.type=localStorage.getItem('type') || '{}';
    this.noticeService.getAllPast3Months().subscribe((notices:Notice[])=>{
      this.notices=notices;
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });
  }

  kategorija(notice:Notice){
    switch(notice.category){
      case 1: return 'Studentska takmičenja';break;
      case 2: return 'Konferencije';break;
      case 3: return 'Praksa';break;
      case 4: return 'Posao';break;
      default:return '';break;
    }
  }

  /* datum(date:Date){
    return date.getDate()+'.'+date.getMonth()+'.';
  } */

  addNotice(){
    this.router.navigate(['/dodajObavestenje']);
  }

  updateNotice(notice:Notice){
    localStorage.setItem('notice',JSON.stringify(notice));
    this.router.navigate(['/azurirajObavestenje']); 
  }

  deleteAllNotices(){//dodati dijalog
    this.noticeService.deleteAllNotices().pipe(
      mergeMap(()=>this.noticeService.getAllPast3Months())
    ).subscribe((notices:Notice[])=>{
      this.notices=notices;
      window.location.reload();
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });
  }

  deleteNotice(notice:Notice){
    this.noticeService.deleteNotice(notice.id).pipe(
      mergeMap(()=>this.noticeService.getAllPast3Months())
    ).subscribe((notices:Notice[])=>{
      this.notices=notices;
      window.location.reload();
    },
    (error:ErrorEvent)=>{
      this.errorMsg=error.error.message;
    });
  }

  

}
