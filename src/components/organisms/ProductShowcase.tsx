import React, { useState } from 'react';
import { PRODUCTS_DATA, PRODUCT_CATEGORIES } from '../../data/productsData';
import { ProductCard } from '../molecules/ProductCard';
import { SectionHeading } from '../atoms/SectionHeading';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-28 relative bg-[#f8fafc] overflow-hidden border-t border-slate-200">
      <div className="bg-grid-pattern absolute inset-0 opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading
          eyebrow="MEDICAL TECHNOLOGY ECOSYSTEM"
          title="Radiology & Healthcare Equipment"
          subtitle="Explore our advanced diagnostic imaging suites, flat panel detectors, hospital furniture, and spare parts inventory."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
