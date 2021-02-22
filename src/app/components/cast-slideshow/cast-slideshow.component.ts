import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import { Cast } from '../../interfaces/credits-response';

@Component({
  selector: 'app-cast-slideshow',
  templateUrl: './cast-slideshow.component.html',
  styleUrls: ['./cast-slideshow.component.css']
})
export class CastSlideshowComponent implements OnInit, AfterViewInit {

  @Input() cast: Cast[];

  constructor() { }
  ngAfterViewInit(): void {
   const swiper= new Swiper('.swiper-container', {
     slidesPerView:5.3,
     freeMode: true,
     spaceBetween: 15
   });
  }

  ngOnInit(): void {
    // console.log( this.cast );
    
  }

}
