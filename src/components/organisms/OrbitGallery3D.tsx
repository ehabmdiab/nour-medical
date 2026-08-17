import React, { useState } from 'react';
import { GALLERY_DATA, GALLERY_CATEGORIES } from '../../data/galleryData';
import type { GalleryItem } from '../../data/galleryData';
import { SectionHeading } from '../atoms/SectionHeading';
import { Badge } from '../atoms/Badge';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, MapPin } from 'lucide-react';
import { HolographicCard3D } from '../molecules/HolographicCard3D';

export const OrbitGallery3D: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_DATA.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <section className="py-24 relative bg-[#f8fafc] overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeading
          eyebrow="IMMERSIFICATION GALLERY"
          title="Clinical Engineering & Site Gallery"
          subtitle="A cinematic visual record of heavy CT/MRI gantry rigging, Cath-Lab installations, and university hospital projects across Egypt."
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3D Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <HolographicCard3D onClick={() => setActiveItem(item)} className="h-full flex flex-col justify-between group">
                  <div>
                    <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4 bg-slate-100 border border-slate-200">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                      <div className="absolute top-2.5 left-2.5">
                        <Badge variant="cyan">{item.categoryLabel}</Badge>
                      </div>
                      <div className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 text-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-700 mb-1 font-bold">
                      <MapPin className="w-3 h-3 text-cyan-600" />
                      <span>{item.location}</span>
                    </div>

                    <h3 className="text-base font-heading font-extrabold text-slate-900 group-hover:text-cyan-600 transition-colors mb-2">
                      {item.title}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <span>{item.specs.split('|')[0]}</span>
                    <span>{item.date}</span>
                  </div>
                </HolographicCard3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Lightbox Inspector Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-900/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl bg-white border border-slate-300 rounded-3xl p-6 md:p-8 overflow-hidden shadow-2xl text-slate-900"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 h-80 md:h-[450px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img src={activeItem.image} alt={activeItem.title} className="w-full h-full object-cover" />
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <Badge variant="cyan">{activeItem.categoryLabel}</Badge>
                    <h2 className="text-2xl font-heading font-extrabold text-slate-900 mt-3 mb-2">{activeItem.title}</h2>
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-700 font-bold">
                      <MapPin className="w-4 h-4 text-cyan-600" />
                      <span>{activeItem.location}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">{activeItem.description}</p>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">TECHNICAL HIGHLIGHTS</span>
                    <p className="text-xs font-mono text-cyan-800 font-bold">{activeItem.specs}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-4 border-t border-slate-200">
                    <span>Year Completed: {activeItem.date}</span>
                    <span>Certified Nour Medical Site</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
