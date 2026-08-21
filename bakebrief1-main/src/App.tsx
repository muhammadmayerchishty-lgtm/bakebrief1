import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { MenuItem, CartItem } from './types';
import CinematicIntro from './components/CinematicIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LiveKitchenSection from './components/LiveKitchenSection';
import InteractiveMenu from './components/InteractiveMenu';
import BriefDetailModal from './components/BriefDetailModal';
import StorySection from './components/StorySection';
import GallerySection from './components/GallerySection';
import VerdictsSection from './components/VerdictsSection';
import ContactSection from './components/ContactSection';
import TableReservationModal from './components/TableReservationModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import ParticleCanvas from './components/ParticleCanvas';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [examinedItem, setExaminedItem] = useState<MenuItem | null>(null);

  // Cart operations
  const handleAddToCart = (item: MenuItem, quantity = 1, selectedOptions: string[] = [], notes = '') => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((ci) => ci.item.id === item.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        if (selectedOptions.length) updated[existingIdx].selectedOptions = selectedOptions;
        if (notes) updated[existingIdx].notes = notes;
        return updated;
      } else {
        return [...prev, { item, quantity, selectedOptions, notes }];
      }
    });
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => (ci.item.id === id ? { ...ci, quantity: newQty } : ci))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#050505] text-[#F5F5F0] selection:bg-[#C5A059] selection:text-black font-sans relative overflow-x-hidden">
        {/* Custom Luxury Smooth Cursor */}
        <CustomCursor />

        {/* Ambient Interactive Floating Gold Dust Particles */}
        <ParticleCanvas />

        {/* Luxury Cinematic Commercial Intro Experience */}
        <AnimatePresence>
          {loading && <CinematicIntro onComplete={() => setLoading(false)} />}
        </AnimatePresence>

        {!loading && (
          <>
            {/* Top Navbar */}
            <Navbar
              cartCount={cartItems.reduce((acc, ci) => acc + ci.quantity, 0)}
              onOpenCart={() => setCartOpen(true)}
              onOpenReservation={() => setReservationOpen(true)}
              onSearchClick={() => scrollToSection('menu')}
            />

            {/* Main Website Flow */}
            <main className="relative z-10">
              {/* 1. Large Cinematic Hero */}
              <Hero
                onExploreMenu={() => scrollToSection('menu')}
                onOpenReservation={() => setReservationOpen(true)}
                onWatchLive={() => scrollToSection('live-kitchen')}
              />

              {/* 2. Special Feature: Live Courtroom Preparation Kitchen */}
              <LiveKitchenSection />

              {/* 3. Interactive Menu (10 Categories) */}
              <InteractiveMenu
                onExamineItem={(item) => setExaminedItem(item)}
                onAddToCart={(item) => handleAddToCart(item, 1)}
              />

              {/* 4. Origin Story & Legal Craft Philosophy */}
              <StorySection />

              {/* 5. High-Res Gallery */}
              <GallerySection />

              {/* 6. Verdicts of the Bench (Customer Opinions) */}
              <VerdictsSection />

              {/* 7. Contact & Google Maps Placeholder */}
              <ContactSection onOpenReservation={() => setReservationOpen(true)} />
            </main>

            {/* Footer */}
            <Footer />

            {/* Item Brief Modal */}
            <BriefDetailModal
              item={examinedItem}
              onClose={() => setExaminedItem(null)}
              onAddToCart={handleAddToCart}
            />

            {/* Table Reservation Modal */}
            <TableReservationModal
              isOpen={reservationOpen}
              onClose={() => setReservationOpen(false)}
            />

            {/* Order Brief Cart Drawer */}
            <CartDrawer
              isOpen={cartOpen}
              onClose={() => setCartOpen(false)}
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
            />
          </>
        )}
      </div>
    </SmoothScroll>
  );
}

