import React from 'react';
import { HolographicCard3D } from './HolographicCard3D';
import { Badge } from '../atoms/Badge';
import type { ProductItem } from '../../data/productsData';
import { Zap } from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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

      {/* Main Task Display */}
      <div className="pt-4 border-t border-slate-200">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-mono font-bold text-slate-500 uppercase text-[10px] block mb-0.5">Main Function</span>
            <p className="text-slate-800 font-medium leading-normal">{product.mainTask}</p>
          </div>
        </div>
      </div>
    </HolographicCard3D>
  );
};
