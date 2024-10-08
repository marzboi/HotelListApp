export interface HotelResponse {
  data: Hotel[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
}

export interface Hotel {
  id: string;
  name: string;
  image: string;
  address: string;
  stars: number;
  rate: number;
  price: number;
}
