import { Component, inject, OnInit } from '@angular/core';
import { CardProductsComponent } from '../../components/card-products/card-products.component';
import { SectionHeaderComponent } from '../../../../shared/components/section-header/section-header.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { ProductsService } from '../../services/products.service';
import { NgxPaginationModule } from 'ngx-pagination';
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
  
  // Sort options
  sortBy: 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'newest' | 'oldest' = 'newest';

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

    this.viewportScroller.scrollToPosition([0, 0]);

    this.router.navigate([], {
      queryParams: {
        page: this.page,
      },
    });
  }

  // دالة لحساب السعر النهائي بعد الخصم
  getFinalPrice(product: any): number {
    if (!product.price) return 0;
    
    // لو في سعر بعد الخصم جاهز
    if (product.priceAfterDiscount && product.priceAfterDiscount > 0) {
      return product.priceAfterDiscount;
    }
    
    // لو في نسبة خصم
    if (product.discount && product.discount > 0) {
      return product.price - (product.price * product.discount / 100);
    }
    
    // لو في مبلغ خصم ثابت
    if (product.discountAmount && product.discountAmount > 0) {
      return product.price - product.discountAmount;
    }
    
    // لو مفيش خصم خالص، ارجع السعر الأصلي
    return product.price;
  }

  // دالة الـ Sort - بتشتغل على الداتا الحالية في الصفحة فقط
  getSortedProducts() {
    if (!this.productsService.allProducts) return [];
    
    let products = [...this.productsService.allProducts];
    
    switch(this.sortBy) {
      case 'name-asc':
        return products.sort((a, b) => a.title.localeCompare(b.title));
        
      case 'name-desc':
        return products.sort((a, b) => b.title.localeCompare(a.title));
        
      case 'price-asc':
        return products.sort((a, b) => {
          const priceA = this.getFinalPrice(a);
          const priceB = this.getFinalPrice(b);
          return priceA - priceB;
        });
        
      case 'price-desc':
        return products.sort((a, b) => {
          const priceA = this.getFinalPrice(a);
          const priceB = this.getFinalPrice(b);
          return priceB - priceA;
        });
        
      case 'newest':
        return products.sort((a, b) => 
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
        
      case 'oldest':
        return products.sort((a, b) => 
          new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
        );
        
      default:
        return products;
    }
  }

  clearFilters(): void {
    this.searchText = '';
    this.sortBy = 'newest';
  }

  getSortLabel(sortValue: string): string {
    const labels: Record<string, string> = {
      'newest': 'Newest First',
      'oldest': 'Oldest First',
      'name-asc': 'Name (A-Z)',
      'name-desc': 'Name (Z-A)',
      'price-asc': 'Price (Low to High)',
      'price-desc': 'Price (High to Low)'
    };
    return labels[sortValue] || sortValue;
  }

  // عدد النتائج المفلترة في الصفحة الحالية
  get filteredCount(): number {
    return (this.getSortedProducts() || []).filter(prod => 
      !this.searchText || prod.title.toLowerCase().includes(this.searchText.toLowerCase())
    ).length;
  }
}