import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProductItem } from '../../data/productsData';
import { X, Cpu, Check, ShieldCheck, PhoneCall } from 'lucide-react';
import { MagneticButton } from '../atoms/MagneticButton';
import { Badge } from '../atoms/Badge';
import { useNavigate } from 'react-router-dom';

interface ProductSpecModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export const ProductSpecModal: React.FC<ProductSpecModalProps> = ({ product, onClose }) => {
  const navigate = useNavigate();

  if (!product) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-white border border-slate-300 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden z-10 text-slate-900 my-8"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Image & Origin */}
            <div className="space-y-6">
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="cyan">{product.categoryLabel}</Badge>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500">MANUFACTURER</span>
                  <span className="text-slate-900 font-bold">{product.supplier}</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500">COUNTRY OF ORIGIN</span>
                  <span className="text-cyan-700 font-bold">{product.country}</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500">SERVICE CONTRACT</span>
                  <span className="text-emerald-700 font-bold">24/7 Hotline Included</span>
                </div>
              </div>
            </div>

            {/* Right Column: Full Specifications */}
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono text-cyan-700 tracking-widest uppercase font-bold">TECHNICAL DATASHEET</span>
                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mt-1 mb-2">
                  {product.name}
                </h3>
                <p className="text-xs font-mono text-slate-600 mb-4">{product.tagline}</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">{product.description}</p>

                {/* Key Spec Grid */}
                <h4 className="text-xs font-mono text-slate-800 uppercase tracking-wider mb-3 font-bold flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-600" />
                  <span>Hardware & Diagnostic Specs</span>
                </h4>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {product.specs.map((spec: { label: string; value: string }, idx: number) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block">{spec.label}</span>
                      <span className="text-xs font-heading font-bold text-slate-900">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Key Features Bullet List */}
                <h4 className="text-xs font-mono text-slate-800 uppercase tracking-wider mb-3 font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Key Clinical Advantages</span>
                </h4>

                <ul className="space-y-2 mb-6">
                  {product.features.map((feat: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-cyan-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal CTA */}
              <div className="pt-4 border-t border-slate-200 flex gap-4">
                <MagneticButton
                  onClick={() => {
                    onClose();
                    navigate('/contact');
                  }}
                  variant="primary"
                  className="w-full text-xs"
                  icon={<PhoneCall className="w-4 h-4" />}
                >
                  Request Official Quotation
                </MagneticButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
