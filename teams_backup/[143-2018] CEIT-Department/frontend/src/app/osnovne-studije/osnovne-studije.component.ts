import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-osnovne-studije',
  templateUrl: './osnovne-studije.component.html',
  styleUrls: ['./osnovne-studije.component.css']
})
export class OsnovneStudijeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  goToRTI(){
    this.router.navigate(['/rti']);
  }

  goToSI(){
    this.router.navigate(['/si']);
  }

  goToOstali(){
    this.router.navigate(['/ostali']);
  }
}
