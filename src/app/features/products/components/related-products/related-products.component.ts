import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { SectionHeaderComponent } from "../../../../shared/components/section-header/section-header.component";
import { LoadingSpinnerComponent } from "../../../../shared/components/loading-spinner/loading-spinner.component";
import { CardProductsComponent } from "../card-products/card-products.component";

@Component({
  selector: 'app-related-products',
  imports: [SectionHeaderComponent, LoadingSpinnerComponent, CardProductsComponent],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css',
})
export class RelatedProductsComponent {
private readonly http = inject(HttpClient)
public readonly productsService = inject(ProductsService)
ngOnInit(): void {
  this.getAllProducts()
}
getAllProducts(){
  this.productsService.getAllProducts
}
}
