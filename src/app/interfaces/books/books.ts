export interface Books {
  id: string;
  body: {
    url: string;
    title: string;
    upc: string;
    product_type: string;
    price_excl_tax: number;
    price_incl_tax: number;
    tax: number;
    availability: number;
    num_reviews: number;
    stars: number;
    category: string;
    description: string;
    price: number;
    img: string;
  };
}
