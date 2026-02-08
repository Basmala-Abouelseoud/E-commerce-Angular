// categories.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { CommonModule } from '@angular/common';
import { SubcategoriesService } from '../../services/subcategories-response.service';
import { Subcategory } from '../../interfaces/Subcategory';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../products/services/products.service';
import { CardProductsComponent } from "../../../products/components/card-products/card-products.component";
import { LoadingSpinnerComponent } from "../../../../shared/components/loading-spinner/loading-spinner.component";



@Component({
  selector: 'app-categories-page',
  imports: [CommonModule, FormsModule, CardProductsComponent, LoadingSpinnerComponent],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css',
})
export class CategoriesPageComponent implements OnInit {
public readonly categoriesService = inject(CategoriesService)
  public readonly subcategoriesService = inject(SubcategoriesService);
  public readonly productsService = inject(ProductsService);


  expandedCategories: Set<string> = new Set();
  
  categorySubcategories: Map<string, Subcategory[]> = new Map();
  loadingSubcategories: Map<string, boolean> = new Map();
  
  selectedCategories: Set<string> = new Set();
  selectedSubcategories: Set<string> = new Set();
  
  searchText = '';

  filteredProducts: any[] = [];
  loadingProducts = false;

  ngOnInit(): void {
  this.getAllCategories()
      this.subcategoriesService.loadAllSubcategories();

    this.loadAllProducts();

}

getAllCategories(): void{
this.categoriesService.getAllCategories()
}


  loadAllProducts(): void {
    this.loadingProducts = true;
    this.productsService.getAllProducts(1, 100); // جلب 100 منتج
    
    setTimeout(() => {
      this.loadingProducts = false;
      this.filteredProducts = this.productsService.allProducts || [];
    }, 1000);
  }

  toggleCategory(categoryId: string): void {
    if (this.expandedCategories.has(categoryId)) {
      this.expandedCategories.delete(categoryId);
    } else {
      this.expandedCategories.add(categoryId);
      this.loadSubcategories(categoryId);
    }
  }

  loadSubcategories(categoryId: string): void {
    if (this.categorySubcategories.has(categoryId)) {
      return;
    }

    this.loadingSubcategories.set(categoryId, true);

    this.subcategoriesService.getSubcategoriesByCategoryId(categoryId).subscribe({
      next: (response) => {
        this.categorySubcategories.set(categoryId, response.data);
        this.loadingSubcategories.set(categoryId, false);
      },
      error: (error) => {
        console.error('Error loading subcategories:', error);
        this.loadingSubcategories.set(categoryId, false);
        this.categorySubcategories.set(categoryId, []);
      }
    });
  }

  toggleSubcategorySelection(subcategoryId: string): void {
    if (this.selectedSubcategories.has(subcategoryId)) {
      this.selectedSubcategories.delete(subcategoryId);
    } else {
      this.selectedSubcategories.add(subcategoryId);
    }
    
    this.filterProducts();
  }

  filterProducts(): void {
    if (this.selectedSubcategories.size === 0) {
      this.filteredProducts = this.productsService.allProducts || [];
    } else {
      this.filteredProducts = (this.productsService.allProducts || []).filter(product => {
        return product.subcategory?.some((sub: any) => 
          this.selectedSubcategories.has(sub._id)
        );
      });
    }
  }

  clearAllFilters(): void {
    this.selectedSubcategories.clear();
    this.searchText = '';
    this.filterProducts();
  }

  // Helper methods
  getSubcategories(categoryId: string): Subcategory[] {
    return this.categorySubcategories.get(categoryId) || [];
  }

  isCategoryExpanded(categoryId: string): boolean {
    return this.expandedCategories.has(categoryId);
  }

  isLoadingSubcategories(categoryId: string): boolean {
    return this.loadingSubcategories.get(categoryId) || false;
  }

  isSubcategorySelected(subcategoryId: string): boolean {
    return this.selectedSubcategories.has(subcategoryId);
  }

  get activeFiltersCount(): number {
    return this.selectedSubcategories.size;
  }

  get filteredCategories() {
    if (!this.searchText) {
      return this.categoriesService.allCategories;
    }
    
    return this.categoriesService.allCategories.filter(cat =>
      cat.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  getSelectedSubcategoriesArray(): string[] {
    return Array.from(this.selectedSubcategories);
  }

  getSubcategoryById(subcategoryId: string) {
    return this.subcategoriesService.allSubcategories?.find(s => s._id === subcategoryId);
  }
}
