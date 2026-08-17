import React from 'react';
import { HolographicCard3D } from './HolographicCard3D';
import { Badge } from '../atoms/Badge';
import type { ProductItem } from '../../data/productsData';
import { ArrowUpRight, Cpu } from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
  onOpenSpecs: (product: ProductItem) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenSpecs }) => {
  return (
    <HolographicCard3D className="h-full flex flex-col justify-between group">
      <div>
        {/* Equipment Image Container */}
        <div className="relative h-56 rounded-xl overflow-hidden mb-5 bg-slate-100 border border-slate-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <Badge variant="cyan">{product.categoryLabel}</Badge>
            <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-mono border border-slate-700">
              {product.supplier} ({product.country})
            </span>
          </div>
        </div>

        {/* Product Title & Tagline */}
        <h3 className="text-xl font-heading font-extrabold text-slate-900 group-hover:text-cyan-600 transition-colors mb-2">
          {product.name}
        </h3>
        <p className="text-xs font-mono text-cyan-700 mb-3 font-semibold">{product.tagline}</p>
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">{product.description}</p>
      </div>

      {/* Highlights & Action Button */}
      <div className="pt-4 border-t border-slate-200">
        <div className="grid grid-cols-2 gap-2 mb-4">
          {product.specs.slice(0, 2).map((spec: { label: string; value: string }, idx: number) => (
            <div key={idx} className="flex flex-col bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
              <span className="text-[9px] font-mono text-slate-500 uppercase">{spec.label}</span>
              <span className="text-xs font-heading font-bold text-slate-900 truncate">{spec.value}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => onOpenSpecs(product)}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-cyan-600 text-slate-800 hover:text-white font-mono text-xs tracking-wider uppercase font-semibold flex items-center justify-center gap-2 border border-slate-300 hover:border-cyan-600 transition-all duration-300 group/btn shadow-sm"
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Technical Specifications</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </HolographicCard3D>
  );
};
