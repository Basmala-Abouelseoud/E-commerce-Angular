export interface GetBrandsResponse {
  results: number;
  metadata: {
 currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
  };
  data: Array<Brand>;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

