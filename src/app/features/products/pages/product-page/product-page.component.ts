import { Component, inject, OnInit } from '@angular/core';
import { CardProductsComponent } from '../../components/card-products/card-products.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { ProductsService } from '../../services/products.service';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../../../shared/pipes/filter.pipe';

@Component({
  selector: 'app-product-page',
  imports: [
    CardProductsComponent,
    FormsModule,
    SectionHeaderComponent,
    LoadingSpinnerComponent,
    NgxPaginationModule,
    FilterPipe,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent implements OnInit {
  public readonly productsService = inject(ProductsService);
  public readonly router = inject(Router);
  public readonly activatedRoute = inject(ActivatedRoute);

  public readonly viewportScroller = inject(ViewportScroller);

  page = 1;
  limit = 20;
  searchText = '';

  constructor() {
    const page = +this.activatedRoute.snapshot.queryParamMap.get('page')!;
    this.page = page ? page : 1;
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productsService.getAllProducts(this.page, this.limit);
  }

  pageChanged($event: number): void {
    this.page = $event;
    this.getAllProducts();

    this.viewportScroller.scrollToPosition([0, 0], {
      behavior: 'smooth',
    });

    this.router.navigate([], {
      queryParams: {
        page: this.page,
      },
    });
  }
}
