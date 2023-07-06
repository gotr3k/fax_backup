import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-zaposleni-predmet',
  templateUrl: './zaposleni-predmet.component.html',
  styleUrls: ['./zaposleni-predmet.component.css']
})

export class ZaposleniPredmetComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
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

}


