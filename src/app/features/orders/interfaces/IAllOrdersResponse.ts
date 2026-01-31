export interface IAllOrdersResponse  {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
  paidAt?: string;
}
export interface CartItem  {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

export interface Product  {
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Category;
  ratingsAverage: number;
  id: string;
}

type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

type Subcategory = {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

type ShippingAddress = {
  details: string;
  phone: string;
  city: string;
}