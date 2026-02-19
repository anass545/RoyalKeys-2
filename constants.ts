
import { Product, CategoryType } from './types.ts';

export const PRODUCTS: Product[] = [
  // SOFTWARE
  { 
    id: 'sw-win11', 
    title: 'Windows 11 Professional Retail Key', 
    price: 6.99, 
    category: CategoryType.SOFTWARE, 
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=800', 
    oldPrice: 199.00, 
    badge: 'BESTSELLER' 
  },
  { 
    id: 'sw-off21', 
    title: 'Office 2021 Professional Plus Key', 
    price: 14.50, 
    category: CategoryType.SOFTWARE, 
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800', 
    oldPrice: 439.00 
  },
  { 
    id: 'sw-vs22', 
    title: 'Visual Studio 2022 Enterprise License', 
    price: 29.99, 
    category: CategoryType.SOFTWARE, 
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800' 
  },

  // TRENDING
  { 
    id: 'tr-canva', 
    title: 'Canva Pro Lifetime - Private Account', 
    price: 12.99, 
    category: CategoryType.TRENDING, 
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800', 
    badge: 'HOT' 
  },
  { 
    id: 'tr-adobe', 
    title: 'Adobe Creative Cloud All Apps (1 Year)', 
    price: 89.00, 
    category: CategoryType.TRENDING, 
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800' 
  },

  // SUBSCRIPTIONS
  { 
    id: 'sub-xbox', 
    title: 'Xbox Game Pass Ultimate - 3 Months', 
    price: 24.99, 
    category: CategoryType.SUBSCRIPTIONS, 
    image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?w=800' 
  },
  { 
    id: 'sub-psn', 
    title: 'PlayStation Plus Deluxe - 12 Months', 
    price: 55.00, 
    category: CategoryType.SUBSCRIPTIONS, 
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800' 
  },
  { 
    id: 'sub-gpt', 
    title: 'ChatGPT Plus Premium - 1 Month', 
    price: 18.00, 
    category: CategoryType.SUBSCRIPTIONS, 
    image: 'https://images.unsplash.com/photo-1673174719234-73410503126d?w=800' 
  },

  // GAMES
  { 
    id: 'g-mc', 
    title: 'Minecraft Java & Bedrock Edition', 
    price: 18.20, 
    category: CategoryType.GAMES, 
    image: 'https://images.unsplash.com/photo-1634838080334-28befa9effd0?w=800' 
  },
  { 
    id: 'g-gta5', 
    title: 'Grand Theft Auto V: Premium Edition', 
    price: 11.50, 
    category: CategoryType.GAMES, 
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800' 
  },

  // ANTIVIRUS
  { 
    id: 'av-kas', 
    title: 'Kaspersky Total Security 2024 - 1PC', 
    price: 12.80, 
    category: CategoryType.ANTIVIRUS, 
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800' 
  },
  { 
    id: 'av-bit', 
    title: 'Bitdefender Total Security (3 Devices)', 
    price: 19.99, 
    category: CategoryType.ANTIVIRUS, 
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800' 
  },
];
