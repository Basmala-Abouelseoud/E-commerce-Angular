import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../services/brands.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { CardProductsComponent } from '../../../products/components/card-products/card-products.component';
import { ProductsService } from '../../../products/services/products.service';

@Component({
  selector: 'app-brands-page',
  imports: [CommonModule, FormsModule, CardProductsComponent, LoadingSpinnerComponent],
  templateUrl: './brands-page.component.html',
  styleUrl: './brands-page.component.css',
})
export class BrandsPageComponent implements OnInit {
  public readonly brandsService = inject(BrandsService);
  public readonly productsService = inject(ProductsService);

  searchText = '';
  selectedBrands: Set<string> = new Set();
  filteredProducts: any[] = [];
  loadingProducts = false;
  alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  selectedLetter: string | null = null;

  ngOnInit(): void {
    
    this.brandsService.getAllBrands();

    this.loadAllProducts();
  }

  loadAllProducts(): void {
    this.loadingProducts = true;
    this.productsService.getAllProducts(1, 100);

    setTimeout(() => {
      this.loadingProducts = false;
      this.filteredProducts = this.productsService.allProducts || [];
    }, 1000);
  }

  toggleBrandSelection(brandId: string): void {
    if (this.selectedBrands.has(brandId)) {
      this.selectedBrands.delete(brandId);
    } else {
      this.selectedBrands.add(brandId);
    }
    this.filterProducts();
  }

  filterProducts(): void {
    if (this.selectedBrands.size === 0) {
      this.filteredProducts = this.productsService.allProducts || [];
    } else {
      this.filteredProducts = (this.productsService.allProducts || []).filter((product) => {
        return this.selectedBrands.has(product.brand?._id);
      });
    }
  }

  selectLetter(letter: string): void {
    if (this.selectedLetter === letter) {
      this.selectedLetter = null;
    } else {
      this.selectedLetter = letter;
    }
  }

  clearAllFilters(): void {
    this.selectedBrands.clear();
    this.searchText = '';
    this.selectedLetter = null;
    this.filterProducts();
  }

  get filteredBrands() {
    let brands = this.brandsService.allBrands || [];

    if (this.searchText) {
      brands = brands.filter((b) => b.name.toLowerCase().includes(this.searchText.toLowerCase()));
    }

    if (this.selectedLetter) {
      brands = brands.filter((b) => b.name.toUpperCase().startsWith(this.selectedLetter!));
    }

    return brands;
  }

  isBrandSelected(brandId: string): boolean {
    return this.selectedBrands.has(brandId);
  }

  get activeFiltersCount(): number {
    return this.selectedBrands.size;
  }

  getSelectedBrandsArray(): string[] {
    return Array.from(this.selectedBrands);
  }

  getBrandById(brandId: string) {
    return this.brandsService.allBrands?.find((b) => b._id === brandId);
  }

  getBrandCountByLetter(letter: string): number {
    return (this.brandsService.allBrands || []).filter((b) =>
      b.name.toUpperCase().startsWith(letter),
    ).length;
  }
}
