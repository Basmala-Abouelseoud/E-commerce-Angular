import { environment } from '../../../environments/environment';

export const APP_APIS = {
  PRODUCT: {
    allProducts: `${environment.baseUrl}products`,
  },
  CATEGORIES: {
    allCategories: `${environment.baseUrl}categories`,
  },
  BRANDS: {
    allBrands: `${environment.baseUrl}brands`,
  },
  AUTH: {
    signup: `${environment.baseUrl}auth/signup`,
    login: `${environment.baseUrl}auth/signin`,
  },
  CART: {
    cart: `${environment.baseUrl}cart`,
  }, ORDERS: {
    orders: `${environment.baseUrl}orders/user`,
  },
  PAYMENT: {
    online: `${environment.baseUrl}orders/checkout-session`,
    cash: `${environment.baseUrl}orders`,
  },
};
