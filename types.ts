
export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
  oldPrice?: number;
  description?: string;
}

export enum CategoryType {
  SOFTWARE = 'Best-Selling Software',
  TRENDING = 'Trending Now',
  SUBSCRIPTIONS = 'Subscriptions',
  GAMES = 'Latest Games',
  ANTIVIRUS = 'Security & Antivirus'
}

export interface LicenseKey {
  id: string;
  productId: string;
  productName: string;
  key: string;
  date: string;
  status: 'active' | 'used' | 'revoked';
}

export interface User {
  email: string;
  isLoggedIn: boolean;
  keys: LicenseKey[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type InfoPageType = 'contact' | 'terms' | 'privacy' | 'refunds' | 'faq' | 'activation' | 'ticket';

export type AppView = 'home' | 'product' | 'checkout' | 'catalog' | 'info' | 'dashboard';
