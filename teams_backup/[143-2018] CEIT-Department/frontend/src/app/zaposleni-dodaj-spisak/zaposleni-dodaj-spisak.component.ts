import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { List } from 'src/models/list.model';
import { ListService } from 'src/services/list.service';

@Component({
  selector: 'app-zaposleni-dodaj-spisak',
  templateUrl: './zaposleni-dodaj-spisak.component.html',
  styleUrls: ['./zaposleni-dodaj-spisak.component.css']
})
export class ZaposleniDodajSpisakComponent implements OnInit {

  minDate=new Date();
  date:Date=new Date();
  errorMsg:string='';
  successMsg:string='';
  name:string='';
  place:string='';
  slots:number=0;
  time:string='';
  subjectId:number=0;
  check:boolean=false;
  dateControl=new FormControl('',[Validators.required]);
  nameControl=new FormControl('',[Validators.required]);
  placeControl=new FormControl('',[Validators.required]);
  timeControl=new FormControl('',[Validators.required, Validators.pattern('^([0-1][0-9]|[2][0-3]):([0-5][0-9])$')]);
  slotsControl=new FormControl('',[Validators.required, Validators.pattern('^\\d{0,3}$')]);

  constructor(private router:Router, private listService:ListService) { }

  ngOnInit(): void {
    if(localStorage.getItem('predmet')==null){
      this.router.navigate(['/zaposleniPredmeti']);
    }
    if(localStorage.getItem('type')!='employee'){
      this.router.navigate(['']);
    }
    var predmet=JSON.parse(localStorage.getItem('predmet') || '{}');
    this.subjectId=predmet.id;
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
    this.errorMsg='';
    this.successMsg='';
  }

  create(){
    if(this.getSlotsErrorMessage()=='' && this.getPlaceErrorMessage()=='' && this.getDateErrorMessage()=='' &&
       this.getTimeErrorMessage()=='' && this.getNameErrorMessage()==''){
      var numberOfSlots=this.check?this.slots:null;
      this.listService.create(this.name,this.date,this.time,this.subjectId,this.place,numberOfSlots,true).subscribe((list:List)=>{
        if(!list){
          this.successMsg='';
          this.errorMsg = 'Greška!';
          return;
        }
        else{
          this.errorMsg='';
          this.successMsg='Spisak je otvoren';
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
