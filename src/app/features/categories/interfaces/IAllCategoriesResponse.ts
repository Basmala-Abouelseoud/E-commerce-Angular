export interface IAllCategoriesResponse  {
  results: number;
  metadata : {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}
  data: ICategory[];
}



export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}