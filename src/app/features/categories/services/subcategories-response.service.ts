// subcategories.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategory } from '../interfaces/Subcategory';
import { SubcategoriesResponse } from '../interfaces/Subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {
  private readonly http = inject(HttpClient);
  private baseUrl = 'https://ecommerce.routemisr.com/api/v1';

  allSubcategories: Subcategory[] = [];

  getAllSubcategories(): Observable<SubcategoriesResponse> {
    return this.http.get<SubcategoriesResponse>(`${this.baseUrl}/subcategories`);
  }

  getSubcategoryById(id: string): Observable<{ data: Subcategory }> {
    return this.http.get<{ data: Subcategory }>(`${this.baseUrl}/subcategories/${id}`);
  }

  getSubcategoriesByCategoryId(categoryId: string): Observable<SubcategoriesResponse> {
    return this.http.get<SubcategoriesResponse>(
      `${this.baseUrl}/categories/${categoryId}/subcategories`
    );
  }

  // تحميل كل الـ subcategories
  loadAllSubcategories(): void {
    this.getAllSubcategories().subscribe({
      next: (response) => {
        this.allSubcategories = response.data;
      },
      error: (error) => {
        console.error('Error loading subcategories:', error);
      }
    });
  }
}