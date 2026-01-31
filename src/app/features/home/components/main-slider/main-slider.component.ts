import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { getOwlOptions } from '../../../../core/services/utilities/owl-options.service';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css',
})
export class MainSliderComponent {

 customOptions: OwlOptions = getOwlOptions({items:1})

}
