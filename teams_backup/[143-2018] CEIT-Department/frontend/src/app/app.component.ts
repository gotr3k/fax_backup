import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{

  constructor(public router:Router){}
  tip=localStorage.getItem('type');
  username=JSON.stringify(localStorage.getItem('user'));
  title = 'frontend';
  @ViewChild('kartica') kartica: MatCard = new MatCard;
  hideMenu=true;
  ngOnInit():void{
    if(window.innerWidth<1625){
      this.hideMenu=false;
    }
    window.onresize=()=>this.hideMenu=window.innerWidth>1625;
  }

  logout(){
    this.tip='';
    this.username='';
    localStorage.removeItem('type');
    localStorage.removeItem('user');
    localStorage.removeItem('subject');
    localStorage.removeItem('osoba');
    localStorage.removeItem('predmet');
    window.location.assign('/');
  }


}
