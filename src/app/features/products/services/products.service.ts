import { response } from 'express';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { allProducts, IAllProductsResponse } from '../../home/Interfaces/IAllProductsResponse';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { environment } from '../../../../environments/environment';
import { APP_APIS } from '../../../core/constants/app-apis';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseHttp  {
allProducts!:allProducts[];
totalProducts = 0;
productDetails!:allProducts;



  getAllProducts(page=1,limit=8):void{
this.http.get<IAllProductsResponse>(APP_APIS.PRODUCT.allProducts + `?page=${page}&limit=${limit}`)
.subscribe((response)=>{
  console.log(response);
  this.allProducts = response.data
  this.totalProducts = response.results
});
  }


  getTotalProducts(): void {
    const limit = 40; // عدد المنتجات في كل صفحة
    this.http.get<IAllProductsResponse>(`YOUR_API_URL?page=1&limit=${limit}`)
      .subscribe(firstRes => {
        const totalPages = firstRes.metadata.numberOfPages;
        let products = [...firstRes.data];

        if (totalPages > 1) {
          const requests = [];
          for (let page = 2; page <= totalPages; page++) {
            requests.push(this.http.get<IAllProductsResponse>(`YOUR_API_URL?page=${page}&limit=${limit}`));
          }

          forkJoin(requests).subscribe(responses => {
            responses.forEach(res => {
              products = products.concat(res.data);
            });

            this.allProducts = products;
            this.totalProducts = products.length;
            console.log('All Products:', this.allProducts);
          });
        } else {
          this.allProducts = products;
          this.totalProducts = products.length;
          console.log('All Products:', this.allProducts);
        }
      });
  }

getProductById(productId:string){
return this.http.get<any>(APP_APIS.PRODUCT.allProducts + `/${productId}`).subscribe({
  next:(response: {data:allProducts})=>{
    this.productDetails = response.data;
    console.log(response);
    
  },
});
}


}
