export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  isNew?: boolean;
  isSale?: boolean;
  rating: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  count: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}
