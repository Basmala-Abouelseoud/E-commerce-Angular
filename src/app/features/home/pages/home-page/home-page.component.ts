import { Component } from '@angular/core';
import { MainSliderComponent } from '../../components/main-slider/main-slider.component';
import { CategoriesSliderComponent } from '../../components/categories-slider/categories-slider.component';
import { HomeProductsComponent } from '../../components/home-products/home-products.component';

@Component({
  selector: 'app-home-page',
  imports: [MainSliderComponent,CategoriesSliderComponent,HomeProductsComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {

}
