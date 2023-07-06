import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  lang:string='';
  ngOnInit(): void {
    this.lang=localStorage.getItem('language') || '';
  }
}
