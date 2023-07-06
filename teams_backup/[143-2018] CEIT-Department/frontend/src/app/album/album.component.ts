import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.plusSlides(Math.floor(Math.random()*4));
  }

slideIndex:number = 1;

// Next/previous controls
plusSlides(n:number) {
  this.showSlides(this.slideIndex += n);
}

// Thumbnail image controls
currentSlide(n:number) {
  this.showSlides(this.slideIndex = n);
}

showSlides(n:number) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  /*var dots = document.getElementsByClassName("dot");*/
  if (n > slides.length) {this.slideIndex = 1}
  if (n < 1) {this.slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].setAttribute("style","display:none");
  }
  /*for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[this.slideIndex-1].className += " active";*/
  slides[this.slideIndex-1].setAttribute("style","display:block");
  
}
}
