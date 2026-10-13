import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Check, FileText, X, Activity, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n';
import { PRODUCTS_DATA, PRODUCT_CATEGORIES, type ProductItem } from '../data/productsData';

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export const ProductsPage: React.FC = () => {
  const { locale, t } = useLanguage();
  const isAr = locale === 'ar';

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const { ref: gridRef, visible: gridVisible } = useReveal();

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  // Keyboard navigation: Escape key closes product modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCloseModal]);

  // Lock scroll when modal is active
  useEffect(() => {
    if (selectedProduct) {
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = origOverflow;
      };
    }
  }, [selectedProduct]);

  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    const matchesFilter =
      activeFilter === 'all' || product.modality === activeFilter;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      product.name.toLowerCase().includes(query) ||
      product.nameAr.toLowerCase().includes(query) ||
      product.supplier.toLowerCase().includes(query) ||
      product.overview.toLowerCase().includes(query) ||
      product.overviewAr.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  return (
    <>
      {/* ── HERO SECTION ───────────────────────────────────────── */}
      <section className="bg-navy text-white pt-36 pb-20 relative overflow-hidden border-b border-white/10">
        {/* Ambient Medical Dark Grid & Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute -right-[10%] top-0 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(27,79,216,0.18)_0%,transparent_70%)] pointer-events-none" />

        <div className="container relative z-[1]">
          <div className="section-label">
            {t('products.heroLabel')}
          </div>

          <h1 className="font-heading text-[clamp(2.75rem,5.5vw,5rem)] font-bold text-white tracking-[-0.035em] leading-[1.02] max-w-[900px] mb-5">
            {t('products.heroTitle')}
          </h1>

          <p className="font-body text-[clamp(1.125rem,1.8vw,1.375rem)] leading-[1.65] text-white/80 max-w-[720px] mb-10">
            {t('products.heroDesc')}
          </p>

          {/* Search & Modality Filters */}
          <div className="flex flex-col gap-5">
            {/* Search Input */}
            <div className="relative max-w-[480px]">
              <Search
                size={18}
                className={`absolute top-1/2 -translate-y-1/2 text-stone ${isAr ? 'right-4' : 'left-4'}`}
              />
              <input
                type="text"
                placeholder={t('products.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full ${isAr ? 'pr-12 pl-4.5' : 'pl-12 pr-4.5'} py-3.5 rounded-xl border border-white/15 bg-white text-navy font-body text-[0.9375rem] outline-none shadow-lg focus:ring-2 focus:ring-blue-medical/40 transition-all`}
              />
            </div>

            {/* Modality Filter Tabs */}
            <div
              className="flex gap-2.5 flex-wrap items-center"
              role="tablist"
              aria-label={t('products.modalityFilterAria')}
            >
              {PRODUCT_CATEGORIES.map((cat) => {
                const isActive = activeFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`py-2.5 px-4.5 rounded-full font-body text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-orange-accent text-white border border-orange-accent shadow-[0_4px_14px_rgba(249,115,22,0.35)]'
                        : 'bg-white/10 text-white/90 border border-white/15 backdrop-blur-sm shadow-sm hover:bg-white/20 hover:border-white/30'
                    }`}
                  >
                    {isAr ? cat.labelAr : cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE GRID ──────────────────────────────── */}
      <section
        ref={gridRef as React.RefObject<HTMLElement>}
        className={`py-[var(--section-gap)] bg-white transition-opacity duration-600 ease-[var(--ease-smooth)] ${
          gridVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-8">
            {filteredProducts.map((product) => {
              const productName = isAr ? product.nameAr : product.name;
              const productTagline = isAr ? product.taglineAr : product.tagline;
              const productOverview = isAr ? product.overviewAr : product.overview;
              const categoryName = isAr ? product.modalityLabelAr : product.modalityLabel;

              return (
                <div
                  key={product.id}
                  className="bg-white border border-gray-light rounded-[20px] overflow-hidden flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_4px_20px_rgba(10,22,40,0.04)] hover:-translate-y-1.5 hover:border-orange-accent hover:shadow-[0_20px_40px_rgba(10,22,40,0.08)] relative"
                >
                  {/* Equipment Photography */}
                  <div
                    className="relative h-60 overflow-hidden bg-slate-100 cursor-pointer group"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={productName}
                      className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                    />
                    <span
                      className={`absolute top-3.5 ${isAr ? 'right-3.5' : 'left-3.5'} py-1.5 px-3.5 rounded-full bg-navy/90 backdrop-blur-md text-white font-mono text-[0.6875rem] font-semibold uppercase tracking-wider border border-white/15`}
                    >
                      {categoryName}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-7 flex-1 flex flex-col">
                    {/* Subtitle / Tagline */}
                    <span className="font-mono text-[0.6875rem] text-orange-accent font-bold uppercase tracking-wider mb-2">
                      {productTagline}
                    </span>

                    {/* Machine Name */}
                    <h3 className="font-heading text-[1.4375rem] font-bold text-navy mb-3.5 leading-[1.25]">
                      {productName}
                    </h3>

                    {/* Machine Overview (نبذة عن الجهاز) */}
                    <div className="p-3.5 px-4 rounded-xl bg-warm-white border border-gray-light mb-5">
                      <div className="font-mono text-[0.6875rem] font-bold text-navy uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <FileText size={13} className="text-orange-accent" />
                        {t('products.systemOverviewLabel')}
                      </div>
                      <p className="font-body text-sm leading-relaxed text-text-muted m-0 line-clamp-3">
                        {productOverview}
                      </p>
                    </div>

                    {/* Key Specs Pills */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {product.specs.slice(0, 4).map((spec, idx) => (
                        <div
                          key={idx}
                          className="p-2 px-2.5 bg-slate-50 rounded-lg border border-gray-light"
                        >
                          <span className="block font-mono text-[0.625rem] text-text-muted uppercase mb-0.5">
                            {isAr && spec.labelAr ? spec.labelAr : spec.label}
                          </span>
                          <strong className="block text-xs text-navy font-semibold truncate">
                            {isAr && spec.valueAr ? spec.valueAr : spec.value}
                          </strong>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Action Button to Open Full Modal */}
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="mt-auto w-full py-3 px-5 rounded-xl border border-navy bg-transparent text-navy font-body text-sm font-bold inline-flex items-center justify-center gap-2 cursor-pointer transition-colors hover:bg-navy hover:text-white"
                    >
                      {t('products.viewFullSpecs')}
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MODAL: FULL OVERVIEW & TECHNICAL SPECIFICATIONS ───── */}
      {selectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isAr ? selectedProduct.nameAr : selectedProduct.name}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-[clamp(16px,3vw,40px)] bg-navy/75 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          <div className="w-full max-w-[860px] max-h-[90vh] bg-white rounded-[20px] shadow-[0_25px_60px_rgba(0,0,0,0.25)] border border-gray-light overflow-y-auto relative animate-[fadeInUp_0.3s_cubic-bezier(0.16,1,0.3,1)]">
            {/* Modal Header Bar with Close Button */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-gray-light flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="py-1 px-2.5 rounded-xl bg-orange-subtle text-orange-accent font-mono text-[0.6875rem] font-bold uppercase">
                  {isAr ? selectedProduct.modalityLabelAr : selectedProduct.modalityLabel}
                </span>
                <span className="font-heading text-lg font-bold text-navy">
                  {isAr ? selectedProduct.nameAr : selectedProduct.name}
                </span>
              </div>

              <button
                type="button"
                aria-label={t('products.close')}
                onClick={handleCloseModal}
                className="w-9 h-9 rounded-full bg-warm-white border border-gray-light flex items-center justify-center cursor-pointer text-navy hover:bg-gray-light transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-7">
              {/* Product Hero Image */}
              <div className="w-full h-[280px] rounded-2xl overflow-hidden bg-slate-100 mb-7 border border-gray-light">
                <img
                  src={selectedProduct.image}
                  alt={isAr ? selectedProduct.nameAr : selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tagline & Machine Name */}
              <div className="mb-6">
                <span className="font-mono text-xs font-bold text-orange-accent uppercase tracking-wider block mb-1.5">
                  {isAr ? selectedProduct.taglineAr : selectedProduct.tagline}
                </span>
                <h2 className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-navy leading-[1.2]">
                  {isAr ? selectedProduct.nameAr : selectedProduct.name}
                </h2>
              </div>

              {/* SECTION: Overview (نبذة عن الجهاز) */}
              <div className={`p-5.5 px-6 rounded-2xl bg-warm-white border border-gray-light ${
                isAr ? 'border-r-4 border-r-orange-accent' : 'border-l-4 border-l-orange-accent'
              } mb-8`}>
                <h3 className="font-heading text-[1.1875rem] font-bold text-navy mb-2.5 flex items-center gap-2">
                  <FileText size={18} className="text-orange-accent" />
                  {t('products.modalOverviewHeading')}
                </h3>
                <p className="font-body text-base leading-relaxed text-text-body m-0">
                  {isAr ? selectedProduct.overviewAr : selectedProduct.overview}
                </p>
              </div>

              {/* SECTION: Technical Specifications Table (المواصفات الفنية) */}
              <div className="mb-8">
                <h3 className="font-heading text-xl font-bold text-navy mb-4 flex items-center gap-2">
                  <Activity size={18} className="text-blue-medical" />
                  {t('products.modalSpecsHeading')}
                </h3>
                <div className="border border-gray-light rounded-xl overflow-hidden">
                  {selectedProduct.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-[1fr_1.5fr] py-3 px-4.5 ${
                        idx % 2 === 0 ? 'bg-white' : 'bg-warm-white'
                      } ${idx === selectedProduct.specs.length - 1 ? '' : 'border-b border-gray-light'}`}
                    >
                      <span className="font-mono text-[0.8125rem] text-text-muted font-semibold">
                        {isAr && spec.labelAr ? spec.labelAr : spec.label}
                      </span>
                      <strong className="font-body text-sm text-navy font-bold">
                        {isAr && spec.valueAr ? spec.valueAr : spec.value}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: Clinical Applications */}
              <div className="mb-8">
                <h3 className="font-heading text-xl font-bold text-navy mb-4 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-teal-accent" />
                  {t('products.modalClinicalHeading')}
                </h3>
                <div className="flex flex-col gap-2">
                  {(isAr && selectedProduct.clinicalApplicationsAr
                    ? selectedProduct.clinicalApplicationsAr
                    : selectedProduct.clinicalApplications
                  ).map((app, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-2.5 px-3.5 rounded-lg bg-slate-50 border border-gray-light text-sm text-navy font-medium"
                    >
                      <Check size={16} className="text-orange-accent shrink-0" />
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer / Direct Inquiry CTA */}
              <div className="flex items-center justify-between gap-4 pt-5 border-t border-gray-light flex-wrap">
                <div>
                  <span className="font-mono text-[0.6875rem] text-text-muted uppercase block">
                    {t('products.warrantyBadge')}
                  </span>
                  <strong className="text-sm text-navy">
                    {t('products.warrantyText')}
                  </strong>
                </div>

                <Link
                  to="/contact"
                  className="btn btn-primary py-3 px-6 rounded-lg bg-orange-accent border-orange-accent text-white font-bold"
                  onClick={handleCloseModal}
                >
                  {t('products.requestConsultation')}
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CTA SECTION ────────────────────────────────────────── */}
      <section className="py-20 bg-warm-white border-t border-gray-light text-center">
        <div className="container max-w-[640px]">
          <h2 className="font-heading text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold text-navy tracking-[-0.03em] leading-[1.08] mb-5">
            {t('products.ctaHeading')}
          </h2>
          <p className="font-body text-[1.0625rem] leading-[1.7] text-text-muted mb-9">
            {t('products.ctaDesc')}
          </p>
          <Link
            to="/contact"
            className="btn btn-primary gap-2 bg-orange-accent border-orange-accent"
          >
            {t('products.requestQuotation')}
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
};
