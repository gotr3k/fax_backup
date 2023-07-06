import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public translate: TranslateService) { 
    translate.addLangs(['en', 'sr-Latn', 'sr-Cyrl']);
    translate.setDefaultLang('sr-Latn');
  }

  public language1:string='';
  public language2:string='';
  public language3:string='';

  ngOnInit(): void {
    this.language1=localStorage.getItem('language') || '';
    switch(this.language1){     
      case 'Srpski': this.translate.use('sr-Latn'); this.language2='English';this.language3='Српски'; break;
      case 'English': this.translate.use('en'); this.language2='Srpski';this.language3='Српски'; break;
      case 'Српски': this.translate.use('sr-Cyrl'); this.language2='English';this.language3='Srpski';break;
      default: this.translate.use('sr-Latn'); this.language1='Srpski'; this.language2='English';this.language3='Српски'; localStorage.setItem('language',this.language1); break;
    }
  }

  changeLanguageTo2(){
    
    switch(this.language2){
      case 'Srpski': this.translate.use('sr-Latn'); break;
      case 'English': this.translate.use('en'); break;
      case 'Српски': this.translate.use('sr-Cyrl'); break;
      default: this.translate.use('sr-Latn'); break;
    }
    var pom:string=this.language2;
    this.language2=this.language1;
    this.language1=pom;
    localStorage.setItem('language',pom);
    //window.location.reload();
  }

  changeLanguageTo3(){
    switch(this.language3){
      case 'Srpski': this.translate.use('sr-Latn'); break;
      case 'English': this.translate.use('en'); break;
      case 'Српски': this.translate.use('sr-Cyrl'); break;
      default: this.translate.use('sr-Latn'); break;
    }
    var pom:string=this.language3;
    this.language3=this.language1;
    this.language1=pom;
    localStorage.setItem('language',pom);
    //window.location.reload();
  }
}
