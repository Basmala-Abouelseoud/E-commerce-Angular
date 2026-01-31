import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../../categories/services/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { getOwlOptions } from '../../../../core/services/utilities/owl-options.service';

@Component({
  selector: 'app-categories-slider',
  imports: [CarouselModule],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.css',
})
export class CategoriesSliderComponent {

public readonly categoriesService = inject(CategoriesService)

  ngOnInit(): void {
  this.getAllCategories()
}
getAllCategories(): void{
this.categoriesService.getAllCategories()
}



 customOptions: OwlOptions = getOwlOptions({responsive:  {
  0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 6
      },
      940: {
        items: 8
      }}})
}
