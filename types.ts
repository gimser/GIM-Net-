
export type Language = 'ar' | 'ma' | 'en' | 'de' | 'fr';

export type Category = 'all' | 'cctv' | 'smarthome' | 'networks' | 'dev';

export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  category: Category;
  image: string;
  desc: string;
  specs?: string[];
}

export type PageId = 'home' | 'store' | 'networks' | 'websites' | 'smarthome';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BookingData {
  name: string;
  email: string;
  phone: string;
  service: string;
  address: string;
  description: string;
}
