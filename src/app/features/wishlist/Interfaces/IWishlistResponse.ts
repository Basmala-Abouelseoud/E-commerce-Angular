export interface Product {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  quantity: number;
  sold: number;
  id: string;
}



export interface WishlistAddResponse {
  status: string;
  message: string;
  data: string[]; // array of product IDs
}

export interface WishlistGetResponse {
  status: string;
  count: number;
  data: Product[];
}
