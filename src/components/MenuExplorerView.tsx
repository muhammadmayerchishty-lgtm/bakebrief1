import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Plus, 
  Check, 
  Info, 
  AlertTriangle, 
  UtensilsCrossed, 
  MessageSquare,
  Leaf,
  Award
} from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/bakebriefData';

interface MenuExplorerViewProps {
  onAddToCart: (item: MenuItem, quantity?: number, option?: { name: string; price: number }) => void;
  onAskBrief: (query: string) => void;
}

export const MenuExplorerView: React.FC<MenuExplorerViewProps> = ({
  onAddToCart,
  onAskBrief,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, { name: string; price: number }>>({});
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'Full Menu' },
    { id: 'cakes', label: 'Artisan Cakes & Tarts' },
    { id: 'bakery', label: 'Fresh Viennoiserie' },
    { id: 'savory', label: 'Gourmet Savory & Café' },
    { id: 'beverages', label: 'Specialty Coffee & Drinks' },
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    // Category filter
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }

    // Dietary filter
    if (selectedDiet === 'vegetarian' && !item.isVegetarian) return false;
    if (selectedDiet === 'nut-free' && item.allergens.some(a => a.toLowerCase().includes('nut'))) return false;
    if (selectedDiet === 'bestseller' && !item.isBestseller) return false;
    if (selectedDiet === 'chef' && !item.isChefsSpecial) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchIngr = item.ingredients.some(i => i.toLowerCase().includes(q));
      return matchName || matchDesc || matchIngr;
    }

    return true;
  });

  const handleAdd = (item: MenuItem) => {
    const chosenOption = selectedOptions[item.id] || (item.options ? item.options[0] : undefined);
    onAddToCart(item, 1, chosenOption);
    setAddedIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [item.id]: false }));
    }, 1800);
  };

  const handleOptionChange = (itemId: string, option: { name: string; price: number }) => {
    setSelectedOptions(prev => ({ ...prev, [itemId]: option }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Banner & Search Header */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 rounded-3xl border border-stone-800 p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <UtensilsCrossed className="w-4 h-4" />
            <span>Authentic Artisan Selection • Lahore, Pakistan</span>
          </div>
          <h1 className="font-serif font-black text-2xl sm:text-4xl text-stone-100">
            The BAKEBRIEF Menu
          </h1>
          <p className="text-stone-400 text-sm mt-1 max-w-xl">
            Laminated viennoiserie, Belgian chocolate cakes, truffle savory sandwiches, and single-origin coffee. Every bite wins the case.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cakes, ingredients, coffee..."
            className="w-full bg-stone-950/80 text-stone-100 text-sm pl-10 pr-4 py-2.5 rounded-xl border border-stone-700/60 focus:outline-none focus:border-amber-500 transition-colors placeholder-stone-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Pills & Dietary Filters */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-stone-800">
        
        {/* Category switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dietary tags */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setSelectedDiet(selectedDiet === 'vegetarian' ? 'all' : 'vegetarian')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              selectedDiet === 'vegetarian'
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50'
                : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:text-stone-200'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>Vegetarian</span>
          </button>

          <button
            onClick={() => setSelectedDiet(selectedDiet === 'nut-free' ? 'all' : 'nut-free')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              selectedDiet === 'nut-free'
                ? 'bg-amber-950/60 text-amber-300 border-amber-500/50'
                : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:text-stone-200'
            }`}
          >
            <span>Nut-Free</span>
          </button>

          <button
            onClick={() => setSelectedDiet(selectedDiet === 'bestseller' ? 'all' : 'bestseller')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              selectedDiet === 'bestseller'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:text-stone-200'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Bestsellers</span>
          </button>
        </div>
      </div>

      {/* Grid of Menu Items */}
      {filteredItems.length === 0 ? (
        <div className="bg-stone-900/50 rounded-2xl border border-stone-800 p-12 text-center">
          <Info className="w-10 h-10 text-amber-500/60 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-stone-200">No items match your filter</h3>
          <p className="text-sm text-stone-400 mt-1">Try clearing your search or switching categories.</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setSelectedDiet('all'); }}
            className="mt-4 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-semibold rounded-lg"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const currentOption = selectedOptions[item.id] || (item.options ? item.options[0] : null);
            const currentPrice = currentOption ? currentOption.price : item.price;

            return (
              <div
                key={item.id}
                className="bg-stone-900/90 rounded-2xl border border-stone-800/80 hover:border-amber-500/40 transition-all duration-200 flex flex-col overflow-hidden shadow-lg group"
              >
                {/* Image Container */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.isBestseller && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-stone-950 shadow">
                        Bestseller
                      </span>
                    )}
                    {item.isChefsSpecial && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white shadow">
                        Chef's Special
                      </span>
                    )}
                  </div>

                  {/* Category Pill */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-stone-950/80 text-amber-300 border border-stone-700">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-3 bg-stone-950/90 border border-amber-500/40 px-3 py-1 rounded-xl text-sm font-bold text-amber-400 shadow">
                    {item.currency} {currentPrice.toLocaleString()}
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-stone-100 group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Options selection if item has multiple sizes/variants */}
                    {item.options && item.options.length > 0 && (
                      <div className="mt-3">
                        <label className="text-[11px] font-semibold text-stone-400 block mb-1.5">
                          Select Size / Option:
                        </label>
                        <div className="grid grid-cols-2 gap-1.5">
                          {item.options.map((opt, oIdx) => (
                            <button
                              key={oIdx}
                              onClick={() => handleOptionChange(item.id, opt)}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border text-left transition-colors ${
                                currentOption?.name === opt.name
                                  ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                                  : 'bg-stone-950/60 text-stone-400 border-stone-800 hover:border-stone-700'
                              }`}
                            >
                              <div className="truncate">{opt.name}</div>
                              <div className="text-[10px] text-amber-400 font-bold">
                                PKR {opt.price.toLocaleString()}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Ingredients & Allergens preview */}
                    <div className="mt-3 pt-3 border-t border-stone-800/60 space-y-1.5 text-[11px]">
                      <div className="text-stone-400">
                        <span className="font-semibold text-stone-300">Key Ingredients: </span>
                        <span>{item.ingredients.slice(0, 4).join(', ')}</span>
                      </div>

                      {item.allergens && item.allergens.length > 0 ? (
                        <div className="flex items-center gap-1.5 text-amber-400/90 font-medium">
                          <AlertTriangle className="w-3 h-3 shrink-0" />
                          <span>Contains: {item.allergens.join(', ')}</span>
                        </div>
                      ) : (
                        <div className="text-emerald-400/90 font-medium">
                          ✓ No common nut allergens confirmed
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => onAskBrief(`Can you tell me more about the ${item.name}?`)}
                      className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-amber-300 text-xs font-medium flex items-center justify-center transition-colors border border-stone-700/60"
                      title="Ask Brief about this item"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleAdd(item)}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow ${
                        addedIds[item.id]
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 hover:bg-amber-400 text-stone-950 active:scale-95'
                      }`}
                    >
                      {addedIds[item.id] ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Order</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add to Bag • PKR {currentPrice.toLocaleString()}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
