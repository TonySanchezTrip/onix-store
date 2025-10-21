export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_urls: string[] | null;
  created_at: string;
}