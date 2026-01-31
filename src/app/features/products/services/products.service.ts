import { response } from 'express';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { allProducts, IAllProductsResponse } from '../../home/Interfaces/IAllProductsResponse';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { environment } from '../../../../environments/environment';
import { APP_APIS } from '../../../core/constants/app-apis';

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

getProductById(productId:string){
return this.http.get<any>(APP_APIS.PRODUCT.allProducts + `/${productId}`).subscribe({
  next:(response: {data:allProducts})=>{
    this.productDetails = response.data;
    console.log(response);
    
  },
});
}


}
