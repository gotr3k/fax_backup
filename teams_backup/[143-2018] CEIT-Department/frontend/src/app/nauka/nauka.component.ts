import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nauka',
  templateUrl: './nauka.component.html',
  styleUrls: ['./nauka.component.css']
})
export class NaukaComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  fromScienceGoToResearch(){
    this.router.navigate(['/istrazivanja']);
  }

  fromScienceGoToScienceProjects(){
    this.router.navigate(['/naucni_projekti']);
  }
}
