import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { List } from 'src/models/list.model';
import { ListService } from 'src/services/list.service';
import { PredmetSpisakComponent } from '../predmet-spisak/predmet-spisak.component';


@Component({
  selector: 'app-zaposleni-azuriraj-spisak',
  templateUrl: './zaposleni-azuriraj-spisak.component.html',
  styleUrls: ['./zaposleni-azuriraj-spisak.component.css']
})
export class ZaposleniAzurirajSpisakComponent implements OnInit {

  minDate=new Date();
  date:Date=new Date();
  errorMsg:string='';
  successMsg:string='';
  name:string='';
  place:string='';
  slots:number=0;
  time:string='';
  id:number=0;
  subjectId:number=0;
  open:boolean=true;
  check:boolean=false;
  dateControl=new FormControl('',[Validators.required]);
  nameControl=new FormControl('',[Validators.required]);
  placeControl=new FormControl('',[Validators.required]);
  timeControl=new FormControl('',[Validators.required, Validators.pattern('^([0-1][0-9]|[2][0-3]):([0-5][0-9])$')]);
  slotsControl=new FormControl('',[Validators.required, Validators.pattern('^\\d{0,3}$')]);

  constructor(private router:Router, private listService:ListService) { }

  ngOnInit(): void {
    if(localStorage.getItem('spisak')==null){
      this.router.navigate(['/zaposleniSpiskovi']);
    }
    if(localStorage.getItem('type')!='employee'){
      this.router.navigate(['']);
    }
    var spisak=JSON.parse(localStorage.getItem('spisak') || '{}');
    this.date=spisak.date;
    this.name=spisak.name;
    this.id=spisak.id;
    this.place=spisak.place;
    this.time=spisak.time;
    this.subjectId=spisak.subjectId;
    this.slots=spisak.slots;
    if(spisak.slots!=null){
      this.check=true;
    }
    this.open=spisak.open;
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
    this.router.navigate(['/zaposleniSpiskovi']);
  }

  back(){
    this.router.navigate(['/zaposleniSpiskovi']);
  }

  getDateErrorMessage() {
    return this.dateControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getNameErrorMessage() {
    return this.nameControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getPlaceErrorMessage() {
    return this.placeControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getTimeErrorMessage() {
    if(this.timeControl.hasError('pattern')){
      return 'Unesite vreme između 00:00 i 23:59'
    }
    return this.timeControl.hasError('required') ? 'Ne može biti prazno' : '';
  }

  getSlotsErrorMessage() {
    if(this.slotsControl.hasError('pattern')){
      return 'Unesite broj između 0 i 999'
    }
    return (this.slotsControl.hasError('required') && this.check) ? 'Ne može biti prazno' : '';
  }

  deleteMessage(){
    this.errorMsg='';
    this.successMsg='';
  }

  checked(){
    this.check=!this.check;
  }

  
  update(){
    if(this.getSlotsErrorMessage()=='' && this.getPlaceErrorMessage()=='' && this.getDateErrorMessage()=='' &&
       this.getTimeErrorMessage()=='' && this.getNameErrorMessage()==''){
      var numberOfSlots=this.check?this.slots:null;
      this.listService.update(this.id, this.name,this.date,this.time,this.subjectId,this.place,numberOfSlots,this.open).subscribe((list:List)=>{
        if(!list){
          this.successMsg='';
          this.errorMsg = 'Greška!';
          return;
        }
        else{
          var sp:List={
            id:this.id,
            name:this.name,
            date:this.date,
            time:this.time,
            subjectId:this.subjectId,
            place:this.place,
            slots:this.check?this.slots:null,
            open:this.open
          }
          localStorage.setItem('spisak',JSON.stringify(sp));
          this.errorMsg='';
          this.successMsg='Spisak je ažuriran';
          return;
        }
      })
    }
    else{
      this.errorMsg='Nevalidni podaci';
      this.successMsg='';
    }
  }
}