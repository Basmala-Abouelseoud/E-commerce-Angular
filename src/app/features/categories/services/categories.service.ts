import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAllCategoriesResponse, ICategory } from '../interfaces/IAllCategoriesResponse';
import { response } from 'express';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { environment } from '../../../../environments/environment';
import { APP_APIS } from '../../../core/constants/app-apis';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends BaseHttp {

  allCategories!:ICategory[];

  getAllCategories(){
    return this.http.get<IAllCategoriesResponse>(APP_APIS.CATEGORIES.allCategories).subscribe(response => {
      this.allCategories = response.data
    })
  }

}
