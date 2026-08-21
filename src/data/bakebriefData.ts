export interface MenuItem {
  id: string;
  name: string;
  category: 'cakes' | 'bakery' | 'savory' | 'beverages';
  categoryLabel: string;
  price: number;
  currency: string;
  description: string;
  ingredients: string[];
  allergens: string[];
  options?: { name: string; price: number }[];
  isAvailable: boolean;
  isBestseller?: boolean;
  isChefsSpecial?: boolean;
  isVegetarian?: boolean;
  image: string;
  servingSize?: string;
}

export interface BusinessInfo {
  name: string;
  slogan: string;
  founded: number;
  type: string;
  city: string;
  country: string;
  address: string;
  neighborhood: string;
  phone: string;
  whatsapp: string;
  email: string;
  openingHours: {
    days: string;
    hours: string;
    kitchenCloses: string;
  };
  deliveryInfo: {
    available: boolean;
    zones: string[];
    standardTime: string;
    customCakeAdvance: string;
    deliveryFee: string;
  };
  reservations: {
    supported: boolean;
    note: string;
  };
}

export const BAKEBRIEF_INFO: BusinessInfo = {
  name: 'BAKEBRIEF',
  slogan: 'Every Bite Wins the Case.',
  founded: 2026,
  type: 'Bakery & Café',
  city: 'Lahore',
  country: 'Pakistan',
  address: 'Plot 14-C, Main Boulevard, Gulberg III (Near MM Alam Rd)',
  neighborhood: 'Gulberg III & DHA Phase 5 Delivery Hub',
  phone: '+92 42 3578 9026',
  whatsapp: '+92 300 123 2026',
  email: 'hello@bakebrief.pk',
  openingHours: {
    days: 'Monday – Sunday (7 Days a Week)',
    hours: '8:00 AM – 11:30 PM',
    kitchenCloses: '11:00 PM',
  },
  deliveryInfo: {
    available: true,
    zones: ['Gulberg', 'DHA (Phases 1-8)', 'Model Town', 'Cantt', 'Johar Town', 'Garden Town', 'Faisal Town'],
    standardTime: '40 – 55 Minutes for fresh bakes & café items',
    customCakeAdvance: '24 Hours advance booking for customized tiered cakes',
    deliveryFee: 'PKR 150 – 250 depending on zone in Lahore',
  },
  reservations: {
    supported: true,
    note: 'Table reservations accepted for groups of 4 or more. Indoor cozy dining & outdoor patio available.',
  },
};

export const MENU_ITEMS: MenuItem[] = [
  // ARTISAN CAKES & TARTS
  {
    id: 'briefcase-choc-fudge',
    name: 'The Briefcase Belgian Chocolate Fudge Cake',
    category: 'cakes',
    categoryLabel: 'Artisan Cakes & Tarts',
    price: 3800,
    currency: 'PKR',
    description: 'Our signature rich 70% dark Belgian chocolate fudge cake, moist sponge layered with silky ganache and finished with Maldon sea salt flakes.',
    ingredients: ['70% Belgian Dark Chocolate', 'Dutch Cocoa', 'Farm Butter', 'Organic Eggs', 'Espresso Infusion', 'Sea Salt'],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    options: [
      { name: 'Full Cake (2.5 lbs)', price: 3800 },
      { name: 'Single Generous Slice', price: 850 },
    ],
    isAvailable: true,
    isBestseller: true,
    isChefsSpecial: true,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    servingSize: 'Serves 8-10 people (Full) / 1 person (Slice)',
  },
  {
    id: 'lotus-biscoff-tres-leches',
    name: 'Lotus Biscoff Tres Leches',
    category: 'cakes',
    categoryLabel: 'Artisan Cakes & Tarts',
    price: 950,
    currency: 'PKR',
    description: 'Ultra-light sponge cake drenched in spiced three-milk syrup, crowned with airy Biscoff mousse and crunchy caramelized speculoos crumbs.',
    ingredients: ['Whole Milk', 'Evaporated Milk', 'Condensed Milk', 'Lotus Biscoff Spread', 'Vanilla Bean', 'Flour', 'Eggs'],
    allergens: ['Dairy', 'Gluten', 'Eggs', 'Soy'],
    isAvailable: true,
    isBestseller: true,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    servingSize: 'Individual Bowl (Generous Single Serving)',
  },
  {
    id: 'sicilian-pistachio-raspberry',
    name: 'Sicilian Pistachio & Raspberry Entremet',
    category: 'cakes',
    categoryLabel: 'Artisan Cakes & Tarts',
    price: 1150,
    currency: 'PKR',
    description: 'Layered pure Bronte pistachio sponge, tart wild raspberry compote, white chocolate pistachio whipped ganache with emerald mirror glaze.',
    ingredients: ['Sicilian Pistachio Paste', 'Fresh Raspberry Purée', 'Valrhona White Chocolate', 'Almond Flour', 'Fresh Cream'],
    allergens: ['Tree Nuts (Pistachio, Almond)', 'Dairy', 'Eggs', 'Gluten'],
    isAvailable: true,
    isChefsSpecial: true,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    servingSize: 'Individual Entremet (1 person)',
  },
  {
    id: 'classic-carrot-cake',
    name: 'Classic Spiced Carrot & Walnut Cake',
    category: 'cakes',
    categoryLabel: 'Artisan Cakes & Tarts',
    price: 3400,
    currency: 'PKR',
    description: 'Tender spiced sponge loaded with freshly grated carrots, roasted walnuts, Ceylon cinnamon, and enveloped in silky Philadelphia cream cheese frosting.',
    ingredients: ['Fresh Carrots', 'California Walnuts', 'Philadelphia Cream Cheese', 'Cinnamon', 'Nutmeg', 'Brown Sugar', 'Butter'],
    allergens: ['Tree Nuts (Walnuts)', 'Dairy', 'Eggs', 'Gluten'],
    options: [
      { name: 'Full Cake (2 lbs)', price: 3400 },
      { name: 'Single Slice', price: 800 },
    ],
    isAvailable: true,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=800&q=80',
    servingSize: 'Serves 6-8 (Full) / 1 person (Slice)',
  },
  {
    id: 'burnt-basque-cheesecake',
    name: 'Burnt Basque Cheesecake',
    category: 'cakes',
    categoryLabel: 'Artisan Cakes & Tarts',
    price: 890,
    currency: 'PKR',
    description: 'Baked at high heat for a caramelized deeply golden top with a cloud-like, molten, velvety cream cheese center infused with Madagascar vanilla.',
    ingredients: ['Heavy Cream Cheese', 'Organic Double Cream', 'Madagascar Vanilla Pods', 'Eggs', 'Caster Sugar'],
    allergens: ['Dairy', 'Eggs'],
    options: [
      { name: 'Single Slice', price: 890 },
      { name: 'Full Wheel (2.5 lbs)', price: 3600 },
    ],
    isAvailable: true,
    isBestseller: true,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    servingSize: 'Single Slice / Full Wheel',
  },

  // FRESH VIENNOISERIE & BAKERY
  {
    id: 'signature-butter-croissant',
    name: 'Signature French Butter Croissant',
    category: 'bakery',
    categoryLabel: 'Fresh Viennoiserie & Bakes',
    price: 520,
    currency: 'PKR',
    description: 'Hand-laminated with authentic French Normandy AOP butter, boasting 36 delicate flaky layers with an airy, honeycomb crumb.',
    ingredients: ['Normandy AOP Butter', 'French T55 Flour', 'Fresh Yeast', 'Cane Sugar', 'Sea Salt', 'Milk'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    isAvailable: true,
    isBestseller: true,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    servingSize: '1 Croissant',
  },
  {
    id: 'pain-au-chocolat',
    name: 'Pain au Chocolat (Double Valrhona)',
    category: 'bakery',
    categoryLabel: 'Fresh Viennoiserie & Bakes',
    price: 640,
    currency: 'PKR',
    description: 'Buttery flaky pastry encasing two generous batons of imported 66% Valrhona dark chocolate, baked golden and crisp.',
    ingredients: ['French Laminated Dough', 'Valrhona 66% Dark Chocolate Batons', 'Normandy Butter', 'Egg Wash'],
    allergens: ['Dairy', 'Gluten', 'Eggs', 'Soy'],
    isAvailable: true,
    isBestseller: true,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=800&q=80',
    servingSize: '1 Pastry',
  },
  {
    id: 'cardamom-almond-bostock',
    name: 'Cardamom & Almond Frangipane Bostock',
    category: 'bakery',
    categoryLabel: 'Fresh Viennoiserie & Bakes',
    price: 590,
    currency: 'PKR',
    description: 'Thick-cut golden brioche soaked in orange blossom syrup, smeared with rich almond frangipane, crushed green cardamom, and toasted slivered almonds.',
    ingredients: ['House Brioche', 'Almond Meal', 'Green Cardamom', 'Orange Blossom Water', 'Butter', 'Toasted Almonds'],
    allergens: ['Tree Nuts (Almonds)', 'Dairy', 'Gluten', 'Eggs'],
    isAvailable: true,
    isChefsSpecial: true,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    servingSize: '1 Portion',
  },
  {
    id: 'cinnamon-swirl-cruffin',
    name: 'Cinnamon Swirl Cruffin',
    category: 'bakery',
    categoryLabel: 'Fresh Viennoiserie & Bakes',
    price: 620,
    currency: 'PKR',
    description: 'Hybrid of croissant and muffin rolled in Ceylon cinnamon sugar, pumped with fresh Tahitian vanilla bean pastry cream.',
    ingredients: ['Laminated Pastry Dough', 'Tahitian Vanilla Cream', 'Ceylon Cinnamon', 'Brown Sugar', 'Butter'],
    allergens: ['Dairy', 'Gluten', 'Eggs'],
    isAvailable: true,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&q=80',
    servingSize: '1 Cruffin',
  },
  {
    id: 'turkey-gruyere-danish',
    name: 'Smoked Turkey & Aged Gruyère Savory Danish',
    category: 'bakery',
    categoryLabel: 'Fresh Viennoiserie & Bakes',
    price: 780,
    currency: 'PKR',
    description: 'Flaky savory puff square topped with Dijon bechamel, sliced halal smoked turkey breast, melted aged Swiss Gruyère, and fresh thyme.',
    ingredients: ['Puff Pastry', 'Smoked Turkey (Halal)', 'Swiss Gruyère Cheese', 'Dijon Mustard', 'Bechamel Cream', 'Fresh Thyme'],
    allergens: ['Dairy', 'Gluten', 'Eggs', 'Mustard'],
    isAvailable: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80',
    servingSize: '1 Danish',
  },

  // GOURMET SAVORY & CAFÉ MAINS
  {
    id: 'truffle-mushroom-sourdough',
    name: 'Truffle Wild Mushroom Sourdough Melt',
    category: 'savory',
    categoryLabel: 'Gourmet Savory & Café',
    price: 1290,
    currency: 'PKR',
    description: 'Handcrafted artisan sourdough toast filled with butter-sauteed oyster and cremini mushrooms, truffle garlic butter, caramelized leeks, and molten mozzarella.',
    ingredients: ['Wild Oyster & Cremini Mushrooms', 'White Truffle Oil', 'House Sourdough', 'Mozzarella & Fontina', 'Garlic Butter', 'Caramelized Leeks'],
    allergens: ['Dairy', 'Gluten'],
    isAvailable: true,
    isBestseller: true,
    isChefsSpecial: true,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    servingSize: '1 Full Sandwich with Gourmet Herb Potato Chips',
  },
  {
    id: 'brief-beef-brioche-burger',
    name: 'The Brief Smash Beef Brioche Burger',
    category: 'savory',
    categoryLabel: 'Gourmet Savory & Café',
    price: 1450,
    currency: 'PKR',
    description: 'Double smashed prime local beef patties seared crispy, melted sharp cheddar, onion jam, dill pickles, and house secret "Brief Sauce" in a buttered brioche bun.',
    ingredients: ['Prime Beef Patties', 'Sharp Cheddar', 'Caramelized Onion Jam', 'Pickles', 'House Brief Sauce', 'Toasted Brioche Bun'],
    allergens: ['Dairy', 'Gluten', 'Eggs', 'Mustard'],
    isAvailable: true,
    isBestseller: true,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    servingSize: '1 Burger with Seasoned Truffle Fries',
  },
  {
    id: 'pesto-chicken-focaccia',
    name: 'Grilled Pesto Chicken & Provolone Focaccia',
    category: 'savory',
    categoryLabel: 'Gourmet Savory & Café',
    price: 1350,
    currency: 'PKR',
    description: 'Rosemary sea salt focaccia stuffed with char-grilled herb chicken breast, sun-dried tomatoes, fresh basil walnut pesto, and melted provolone.',
    ingredients: ['Herb Marinated Chicken', 'House Rosemary Focaccia', 'Fresh Basil Walnut Pesto', 'Sun-dried Tomatoes', 'Provolone Cheese', 'Arugula'],
    allergens: ['Tree Nuts (Walnuts)', 'Dairy', 'Gluten'],
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    servingSize: '1 Sandwich with Side Salad',
  },
  {
    id: 'french-chive-omelette',
    name: 'Classic French Soft Scramble Omelette',
    category: 'savory',
    categoryLabel: 'Gourmet Savory & Café',
    price: 890,
    currency: 'PKR',
    description: 'Velvety smooth rolled French-style farm egg omelette with cultured butter, fine garden chives, served with toasted sourdough and organic greens.',
    ingredients: ['Farm Fresh Eggs', 'Cultured French Butter', 'Fresh Chives', 'Toasted Artisan Sourdough', 'Mixed Greens Salad'],
    allergens: ['Dairy', 'Eggs', 'Gluten'],
    isAvailable: true,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    servingSize: '1 Breakfast Plate',
  },

  // SPECIALTY COFFEE & BEVERAGES
  {
    id: 'signature-spanish-latte',
    name: 'BAKEBRIEF Signature Spanish Latte',
    category: 'beverages',
    categoryLabel: 'Specialty Coffee & Drinks',
    price: 680,
    currency: 'PKR',
    description: 'Double shot of specialty roasted Brazilian beans pulled over sweetened condensed milk, blended with velvety textured whole milk and a whisper of cinnamon.',
    ingredients: ['Specialty Espresso Beans', 'Sweetened Condensed Milk', 'Textured Whole Milk', 'Cinnamon Dusting'],
    allergens: ['Dairy'],
    options: [
      { name: 'Hot (8 oz)', price: 680 },
      { name: 'Iced (12 oz)', price: 720 },
    ],
    isAvailable: true,
    isBestseller: true,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    servingSize: 'Standard Cup',
  },
  {
    id: 'cold-brew-salted-caramel',
    name: 'Cold Brew Salted Caramel Cloud',
    category: 'beverages',
    categoryLabel: 'Specialty Coffee & Drinks',
    price: 720,
    currency: 'PKR',
    description: '16-hour slow steep single-origin Ethiopian cold brew coffee topped with a thick, velvety layer of salted vanilla cold cream foam.',
    ingredients: ['Single Origin Ethiopian Cold Brew', 'Heavy Cream Foam', 'Artisan Salted Caramel', 'Madagascar Vanilla'],
    allergens: ['Dairy'],
    isAvailable: true,
    isBestseller: true,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    servingSize: '12 oz Cup over Ice',
  },
  {
    id: 'iced-matcha-strawberry',
    name: 'Iced Matcha Strawberry Breeze',
    category: 'beverages',
    categoryLabel: 'Specialty Coffee & Drinks',
    price: 790,
    currency: 'PKR',
    description: 'Ceremonial grade Japanese Uji matcha whisked fresh, poured over artisanal strawberry purée and creamy organic oat milk.',
    ingredients: ['Ceremonial Uji Matcha', 'House Strawberry Reduction', 'Organic Oat Milk', 'Pure Agave'],
    allergens: [],
    isAvailable: true,
    isChefsSpecial: true,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    servingSize: '12 oz Glass',
  },
  {
    id: 'belgian-hot-chocolate',
    name: 'Rich Artisanal Belgian Hot Chocolate',
    category: 'beverages',
    categoryLabel: 'Specialty Coffee & Drinks',
    price: 750,
    currency: 'PKR',
    description: 'Melted pure 65% Belgian dark chocolate gently whisked with steamed whole milk, topped with a giant house-made torched vanilla marshmallow.',
    ingredients: ['Belgian 65% Dark Chocolate', 'Steamed Milk', 'House Torched Vanilla Marshmallow', 'Cocoa Nibs'],
    allergens: ['Dairy'],
    isAvailable: true,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=800&q=80',
    servingSize: '8 oz Mug',
  },
  {
    id: 'specialty-cortado',
    name: 'Specialty Cortado / Flat White',
    category: 'beverages',
    categoryLabel: 'Specialty Coffee & Drinks',
    price: 580,
    currency: 'PKR',
    description: 'Equal parts bold specialty espresso and silky steamed microfoam milk for the true coffee purist.',
    ingredients: ['Specialty Coffee Beans', 'Steamed Milk'],
    allergens: ['Dairy'],
    isAvailable: true,
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&w=800&q=80',
    servingSize: '6 oz Glass',
  },
];

export const QUICK_PROMPTS = [
  { label: '🍰 What sweet treats do you recommend?', query: 'What sweet treats do you recommend?' },
  { label: '🥐 What is in the Signature Croissant?', query: 'What ingredients are in the Signature Butter Croissant?' },
  { label: '📦 How can I place an order?', query: 'I want to place an order for delivery' },
  { label: '🕒 What are your hours & location in Lahore?', query: 'What are BAKEBRIEF opening hours and location in Lahore?' },
  { label: '🥜 Do you have nut-free cakes?', query: 'Which cakes are nut-free?' },
  { label: '☕ Best coffee pairing for pastries?', query: 'What coffee do you recommend pairing with a pastry?' },
];
