export type MenuCategory = 
  | 'Chicken Burgers'
  | 'Beef Burgers'
  | 'Zinger Burgers'
  | 'Pizzas'
  | 'Cakes'
  | 'Sandwiches'
  | 'Biscuits'
  | 'Fresh Juices'
  | 'Beverages'
  | 'Bakery Items';

export interface LegalBriefDetails {
  docketNumber: string;
  argumentSummary: string;
  evidenceIngredients: string[];
  verdictFlavorProfile: string;
  pairings: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  legalBrief: LegalBriefDetails;
  rating: number;
  reviewsCount: number;
  prepTimeMinutes: number;
  calories: number;
  image: string;
  isChefSpecial?: boolean;
  isGoldGrade?: boolean;
  dietaryTags: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedOptions?: string[];
  notes?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Live Prep' | 'Gourmet Dishes' | 'Pastry Studio' | 'Storefront';
  image: string;
  caption: string;
}

export interface Testimonial {
  id: string;
  judgeName: string;
  courtTitle: string;
  rating: number;
  verdictQuote: string;
  favoriteDish: string;
  date: string;
  avatar: string;
}

export interface LiveCamStream {
  id: string;
  name: string;
  angle: string;
  station: string;
  chefName: string;
  currentActivity: string;
  temperature: string;
  viewers: number;
  image: string;
}
