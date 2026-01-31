import { Injectable } from '@angular/core';
import { BaseHttp } from '../../../core/services/utilities/base-http.service';
import { APP_APIS } from '../../../core/constants/app-apis';
import { Brand, GetBrandsResponse } from '../interfaces/IGetAllBrandsResponse';

@Injectable({
  providedIn: 'root',
})
export class BrandsService extends BaseHttp {
  
allBrands!:Brand[]

getAllBrands(){
  this.http.get<GetBrandsResponse>(APP_APIS.BRANDS.allBrands).subscribe({
next:response => {
this.allBrands = response.data
}
  })
}
}
