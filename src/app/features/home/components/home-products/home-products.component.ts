import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { allProducts, IAllProductsResponse } from '../../Interfaces/IAllProductsResponse';
import { CardProductsComponent } from '../../../products/components/card-products/card-products.component';
import { SectionHeaderComponent } from "../../../../shared/components/section-header/section-header.component";
import { LoadingSpinnerComponent } from "../../../../shared/components/loading-spinner/loading-spinner.component";
import { ProductsService } from '../../../products/services/products.service';

@Component({
  selector: 'app-home-products',
  imports: [CardProductsComponent, SectionHeaderComponent, LoadingSpinnerComponent],
  templateUrl: './home-products.component.html',
  styleUrl: './home-products.component.css',
})
export class HomeProductsComponent implements OnInit {
private readonly http = inject(HttpClient)
public readonly productsService = inject(ProductsService)
ngOnInit(): void {
  this.getAllProducts()
}
getAllProducts(){
  this.productsService.getAllProducts()
}
}


