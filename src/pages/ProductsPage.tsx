import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  Check,
  FileText,
  X,
  Activity,
  ShieldCheck,
} from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import { useLanguage } from "../i18n";
import {
  PRODUCTS_DATA,
  PRODUCT_CATEGORIES,
  type ProductGalleryImage,
  type ProductItem,
} from "../data/productsData";

interface AgencyGalleryGroup {
  agencyKey: string;
  hasAgency: boolean;
  label: string;
  labelAr: string;
  countryFlag: string;
  firstIndex: number;
  items: { item: ProductGalleryImage; index: number }[];
}

function groupGalleryByAgency(gallery: ProductGalleryImage[]): AgencyGalleryGroup[] {
  const groups: AgencyGalleryGroup[] = [];
  gallery.forEach((item, index) => {
    const hasAgency = Boolean(item.agency);
    const key = item.agency ?? "__unbranded__";
    const existing = groups.find((g) => g.agencyKey === key);
    if (existing) {
      existing.items.push({ item, index });
    } else {
      groups.push({
        agencyKey: key,
        hasAgency,
        label: item.agency ?? "",
        labelAr: item.agencyAr ?? "",
        countryFlag: item.countryFlag ?? "",
        firstIndex: index,
        items: [{ item, index }],
      });
    }
  });
  return groups;
}

export const ProductsPage: React.FC = () => {
  const { locale, t } = useLanguage();
  const isAr = locale === "ar";

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null,
  );
  const [cardImageIndices, setCardImageIndices] = useState<
    Record<string, number>
  >({});
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);

  const { ref: gridRef, visible: gridVisible } = useReveal();

  const handleOpenModal = useCallback(
    (product: ProductItem) => {
      setSelectedProduct(product);
      setModalImageIndex(cardImageIndices[product.id] ?? 0);
    },
    [cardImageIndices],
  );

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  // Keyboard navigation: Escape key closes product modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleCloseModal]);

  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    const matchesFilter =
      activeFilter === "all" || product.modality === activeFilter;

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
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
      <section className="bg-gradient-to-b from-white to-warm-white bg-[image:var(--bg-hero-light)] hero-section-pad pb-14 md:pb-16 relative overflow-hidden border-b border-gray-light">
        {/* Subtle Ambient Grid & Upper-Right Orange Glow */}
        <div className="absolute inset-0 bg-[size:60px_60px] bg-[linear-gradient(to_right,rgba(10,22,40,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,22,40,0.03)_1px,transparent_1px)] pointer-events-none" />
        <div className="absolute -right-[6%] -top-[18%] w-[680px] h-[680px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.035)_0%,rgba(251,146,60,0.015)_42%,transparent_72%)] pointer-events-none" />

        <div className="container relative z-[1]">
          <div className="section-label">{t("products.heroLabel")}</div>

          <h1 className="font-heading text-[clamp(2.25rem,3.6vw,3.375rem)] font-bold text-navy tracking-[-0.025em] leading-[1.16] max-w-[1040px] mb-5">
            {t("products.heroTitle")}
          </h1>

          <p className="font-body text-base md:text-lg leading-[1.7] text-navy max-w-[880px] mb-10">
            {t("products.heroDesc")}
          </p>

          {/* Search & Modality Filters */}
          <div className="flex flex-col gap-5">
            {/* Search Input */}
            <div className="relative max-w-[560px]">
              <Search
                size={18}
                className={`absolute top-1/2 -translate-y-1/2 text-navy ${isAr ? "right-4" : "left-4"}`}
              />
              <input
                type="text"
                placeholder={t("products.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full ${isAr ? "pr-12 pl-4.5" : "pl-12 pr-4.5"} py-3.5 rounded-xl border border-gray-light bg-white text-navy font-body text-base outline-none shadow-[0_2px_8px_rgba(10,22,40,0.04)] focus:border-orange-accent focus:ring-2 focus:ring-orange-accent/20 transition-all`}
              />
            </div>

            {/* Modality Filter Tabs */}
            <div
              className="flex gap-2.5 flex-wrap items-center"
              role="tablist"
              aria-label={t("products.modalityFilterAria")}
            >
              {PRODUCT_CATEGORIES.map((cat) => {
                const isActive = activeFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveFilter(cat.id)}
                    className={`py-2.5 px-5 rounded-full font-body text-base font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-orange-accent text-white border border-orange-accent shadow-[0_4px_14px_rgba(249,115,22,0.25)]"
                        : "bg-white text-navy border border-gray-light shadow-sm hover:border-orange-accent"
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
        ref={gridRef}
        className={`py-[var(--section-gap)] bg-white motion-safe:transition-opacity motion-safe:duration-600 ease-[var(--ease-smooth)] ${
          gridVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const productName = isAr ? product.nameAr : product.name;
              const productTagline = isAr ? product.taglineAr : product.tagline;
              const productOverview = isAr
                ? product.overviewAr
                : product.overview;
              const categoryName = isAr
                ? product.modalityLabelAr
                : product.modalityLabel;

              const hasGallery = Boolean(
                product.gallery && product.gallery.length > 0,
              );
              const activeImgIdx = cardImageIndices[product.id] ?? 0;
              const activeGalleryItem = hasGallery
                ? (product.gallery?.[activeImgIdx] ?? product.gallery?.[0])
                : undefined;
              const displayImageSrc = activeGalleryItem
                ? activeGalleryItem.src
                : product.image;
              const displayImageAlt = activeGalleryItem
                ? isAr
                  ? activeGalleryItem.altAr
                  : activeGalleryItem.alt
                : productName;

              return (
                <div
                  key={product.id}
                  className="min-w-0 bg-white border border-gray-light rounded-[20px] overflow-hidden flex flex-col transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_4px_20px_rgba(10,22,40,0.04)] hover:-translate-y-1.5 hover:border-orange-accent hover:shadow-[0_20px_40px_rgba(10,22,40,0.08)] relative"
                >
                  {/* Equipment Photography */}
                  <div
                    className={`relative h-60 overflow-hidden cursor-pointer group ${
                      hasGallery
                        ? "bg-white border-b border-gray-light/70"
                        : "bg-slate-100"
                    }`}
                    onClick={() => handleOpenModal(product)}
                  >
                    <img
                      src={displayImageSrc}
                      alt={displayImageAlt}
                      className={`w-full h-full transition-transform duration-400 group-hover:scale-105 ${
                        hasGallery ? "object-contain p-5" : "object-cover"
                      }`}
                    />
                    <div className="absolute inset-x-3 top-3 flex flex-wrap items-start justify-between gap-2 pointer-events-none">
                      <span className="py-1.5 px-3.5 rounded-full bg-navy/90 backdrop-blur-md text-white font-mono text-xs font-semibold uppercase tracking-wider border border-white/15 max-w-full">
                        {categoryName}
                      </span>

                      {activeGalleryItem?.agency && (
                        <span className="py-1.5 px-3 rounded-full bg-orange-accent text-white font-body text-xs font-bold shadow-sm flex items-center gap-1.5 max-w-full">
                          {activeGalleryItem.countryFlag && (
                            <span>{activeGalleryItem.countryFlag}</span>
                          )}
                          <span>
                            {isAr
                              ? activeGalleryItem.agencyAr
                              : activeGalleryItem.agency}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Supplier Source Pills & Multi-Image Thumbnail Switcher */}
                  {product.gallery && product.gallery.length > 0 && (() => {
                    const agencyGroups = groupGalleryByAgency(product.gallery).filter(
                      (g) => g.hasAgency,
                    );
                    if (agencyGroups.length === 0 && product.gallery.length <= 1) {
                      return null;
                    }
                    return (
                      <div className="bg-slate-50 border-b border-gray-light px-4 py-3 flex flex-col gap-2.5">
                        {/* Agency Selector Pills */}
                        {agencyGroups.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2">
                            {agencyGroups.map((group) => {
                              const isGroupActive =
                                activeGalleryItem?.agency === group.agencyKey;
                              return (
                                <button
                                  key={group.agencyKey}
                                  type="button"
                                  onClick={() =>
                                    setCardImageIndices((prev) => ({
                                      ...prev,
                                      [product.id]: group.firstIndex,
                                    }))
                                  }
                                  className={`px-3 py-1 rounded-full text-xs font-body font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                    isGroupActive
                                      ? "bg-navy text-white shadow-xs"
                                      : "bg-white text-navy border border-gray-light hover:border-orange-accent"
                                  }`}
                                >
                                  {group.countryFlag && (
                                    <span>{group.countryFlag}</span>
                                  )}
                                  <span>{isAr ? group.labelAr : group.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Thumbnails Row (shown when supplier gallery has multiple photos) */}
                        {product.gallery.length > 1 && (
                          <div className="flex flex-wrap gap-2">
                            {product.gallery.map((item, idx) => {
                              const isThumbActive = activeImgIdx === idx;
                              return (
                                <button
                                  key={item.src}
                                  type="button"
                                  aria-label={isAr ? item.altAr : item.alt}
                                  onClick={() =>
                                    setCardImageIndices((prev) => ({
                                      ...prev,
                                      [product.id]: idx,
                                    }))
                                  }
                                  className={`relative w-14 h-12 rounded-lg overflow-hidden bg-white p-1 border transition-all cursor-pointer ${
                                    isThumbActive
                                      ? "border-orange-accent ring-2 ring-orange-accent/30 shadow-xs"
                                      : "border-gray-light opacity-75 hover:opacity-100 hover:border-navy/40"
                                  }`}
                                >
                                  <img
                                    src={item.src}
                                    alt={isAr ? item.altAr : item.alt}
                                    className="w-full h-full object-contain"
                                  />
                                  {item.countryFlag && (
                                    <span className="absolute bottom-0.5 right-1 text-[12px] leading-none">
                                      {item.countryFlag}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Card Content */}
                  <div className="p-5 sm:p-7 flex-1 flex flex-col min-w-0">
                    {/* Subtitle / Tagline */}
                    <span className="font-mono text-xs text-navy font-bold uppercase tracking-wider mb-2 break-words">
                      {productTagline}
                    </span>

                    {/* Machine Name */}
                    <h3 className="font-heading text-xl font-bold text-navy mb-3 leading-[1.3] break-words">
                      {productName}
                    </h3>

                    {/* Machine Overview (نبذة عن الجهاز) */}
                    <div className="p-4 rounded-xl bg-warm-white border border-gray-light mb-5 min-w-0">
                      <div className="font-mono text-xs font-bold text-navy uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <FileText size={14} className="text-orange-accent shrink-0" />
                        {t("products.systemOverviewLabel")}
                      </div>
                      <p className="font-body text-base leading-relaxed text-navy m-0 line-clamp-3 break-words">
                        {productOverview}
                      </p>
                    </div>

                    {/* Key Specs Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                      {product.specs.slice(0, 4).map((spec, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 px-3 bg-slate-50 rounded-lg border border-gray-light min-w-0"
                        >
                          <span className="block font-mono text-xs text-navy/80 font-semibold uppercase mb-0.5 break-words">
                            {isAr && spec.labelAr ? spec.labelAr : spec.label}
                          </span>
                          <strong className="block text-sm text-navy font-bold leading-snug break-words">
                            {isAr && spec.valueAr ? spec.valueAr : spec.value}
                          </strong>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Action Button to Open Full Modal */}
                    <button
                      type="button"
                      onClick={() => handleOpenModal(product)}
                      className="mt-auto w-full py-3.5 px-4 sm:px-5 rounded-xl border border-navy bg-transparent text-navy font-body text-sm sm:text-base font-bold inline-flex items-center justify-center gap-2 text-center cursor-pointer transition-colors hover:bg-navy hover:text-white"
                    >
                      {t("products.viewFullSpecs")}
                      <ArrowRight size={16} className="shrink-0 rtl:rotate-180" />
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
          data-lenis-prevent
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-navy/75 backdrop-blur-md overflow-hidden overscroll-contain"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseModal();
          }}
        >
          <div
            data-lenis-prevent
            className="w-full max-w-[860px] max-h-[86vh] bg-white rounded-[20px] shadow-[0_25px_60px_rgba(0,0,0,0.25)] border border-gray-light flex flex-col overflow-hidden relative animate-[fadeInUp_0.3s_cubic-bezier(0.16,1,0.3,1)]"
          >
            {/* Modal Header Bar with Close Button */}
            <div className="shrink-0 z-20 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-4 border-b border-gray-light flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 flex-wrap min-w-0">
                <span className="py-1 px-3 rounded-xl bg-orange-subtle text-orange-accent font-mono text-xs font-bold uppercase">
                  {isAr
                    ? selectedProduct.modalityLabelAr
                    : selectedProduct.modalityLabel}
                </span>
                <span className="font-heading text-lg font-bold text-navy break-words">
                  {isAr ? selectedProduct.nameAr : selectedProduct.name}
                </span>
              </div>

              <button
                type="button"
                aria-label={t("products.close")}
                onClick={handleCloseModal}
                className="w-9 h-9 shrink-0 rounded-full bg-warm-white border border-gray-light flex items-center justify-center cursor-pointer text-navy hover:bg-gray-light transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div
              data-lenis-prevent
              className="p-4 sm:p-6 md:p-7 flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain"
            >
              {/* Product Hero Image */}
              {selectedProduct.gallery && selectedProduct.gallery.length > 0 ? (
                <div className="mb-7">
                  {(() => {
                    const activeModalItem =
                      selectedProduct.gallery[modalImageIndex] ??
                      selectedProduct.gallery[0];
                    return (
                      <>
                        <div className="relative w-full h-[220px] sm:h-[300px] rounded-2xl overflow-hidden bg-white mb-4 border border-gray-light flex items-center justify-center p-4 sm:p-6">
                          <img
                            src={activeModalItem.src}
                            alt={
                              isAr
                                ? activeModalItem.altAr
                                : activeModalItem.alt
                            }
                            className="w-full h-full object-contain"
                          />
                          {activeModalItem.agency && (
                            <span
                              className={`absolute top-4 ${isAr ? "left-4" : "right-4"} py-1.5 px-3.5 rounded-full bg-orange-accent text-white font-body text-xs font-bold shadow-sm flex items-center gap-1.5`}
                            >
                              {activeModalItem.countryFlag && (
                                <span>{activeModalItem.countryFlag}</span>
                              )}
                              <span>
                                {isAr
                                  ? activeModalItem.agencyAr
                                  : activeModalItem.agency}
                              </span>
                            </span>
                          )}
                        </div>

                        {/* Dynamic Grouped Agency Gallery in Modal */}
                        {selectedProduct.gallery.length > 1 && (
                          <div className="flex flex-wrap gap-5 p-4 rounded-xl bg-slate-50 border border-gray-light">
                            {groupGalleryByAgency(selectedProduct.gallery).map(
                              (group) => (
                                <div key={group.agencyKey} className="min-w-0 flex-1 sm:min-w-[140px]">
                                  {group.hasAgency && (
                                    <div className="font-body text-xs font-bold text-navy mb-2 flex items-center gap-1.5">
                                      {group.countryFlag && (
                                        <span>{group.countryFlag}</span>
                                      )}
                                      <span>
                                        {isAr ? group.labelAr : group.label}
                                      </span>
                                    </div>
                                  )}
                                  <div className="flex flex-wrap gap-2">
                                    {group.items.map(({ item, index }) => (
                                      <button
                                        key={item.src}
                                        type="button"
                                        aria-label={
                                          isAr ? item.altAr : item.alt
                                        }
                                        onClick={() =>
                                          setModalImageIndex(index)
                                        }
                                        className={`w-20 h-16 rounded-lg overflow-hidden bg-white p-1.5 border transition-all cursor-pointer ${
                                          modalImageIndex === index
                                            ? "border-orange-accent ring-2 ring-orange-accent/30"
                                            : "border-gray-light opacity-80 hover:opacity-100"
                                        }`}
                                      >
                                        <img
                                          src={item.src}
                                          alt={isAr ? item.altAr : item.alt}
                                          className="w-full h-full object-contain"
                                        />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ),
                            )}
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="w-full h-[220px] sm:h-[280px] rounded-2xl overflow-hidden bg-slate-100 mb-7 border border-gray-light">
                  <img
                    src={selectedProduct.image}
                    alt={isAr ? selectedProduct.nameAr : selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Tagline & Machine Name */}
              <div className="mb-6">
                <span className="font-mono text-sm font-bold text-navy uppercase tracking-wider block mb-1.5">
                  {isAr ? selectedProduct.taglineAr : selectedProduct.tagline}
                </span>
                <h2 className="font-heading text-[clamp(1.75rem,2.4vw,2.5rem)] font-bold text-navy leading-[1.2] break-words">
                  {isAr ? selectedProduct.nameAr : selectedProduct.name}
                </h2>
              </div>

              {/* SECTION: Overview (نبذة عن الجهاز) */}
              <div
                className={`p-5 sm:p-6 rounded-2xl bg-warm-white border border-gray-light ${
                  isAr
                    ? "border-r-4 border-r-orange-accent"
                    : "border-l-4 border-l-orange-accent"
                } mb-8`}
              >
                <h3 className="font-heading text-lg font-bold text-navy mb-2.5 flex items-center gap-2">
                  <FileText size={18} className="text-orange-accent shrink-0" />
                  {t("products.modalOverviewHeading")}
                </h3>
                <p className="font-body text-base leading-relaxed text-navy m-0 break-words">
                  {isAr ? selectedProduct.overviewAr : selectedProduct.overview}
                </p>
              </div>

              {/* SECTION: Technical Specifications Table (المواصفات الفنية) */}
              <div className="mb-8">
                <h3 className="font-heading text-lg font-bold text-navy mb-4 flex items-center gap-2">
                  <Activity size={18} className="text-orange-accent shrink-0" />
                  {t("products.modalSpecsHeading")}
                </h3>
                <div className="border border-gray-light rounded-xl overflow-hidden">
                  {selectedProduct.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-1 sm:grid-cols-[1fr_1.5fr] gap-1 sm:gap-4 py-3.5 px-4 sm:px-5 ${
                        idx % 2 === 0 ? "bg-white" : "bg-warm-white"
                      } ${idx === selectedProduct.specs.length - 1 ? "" : "border-b border-gray-light"}`}
                    >
                      <span className="font-mono text-sm text-navy font-semibold min-w-0 break-words">
                        {isAr && spec.labelAr ? spec.labelAr : spec.label}
                      </span>
                      <strong className="font-body text-base text-navy font-bold min-w-0 break-words">
                        {isAr && spec.valueAr ? spec.valueAr : spec.value}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: Clinical Applications */}
              <div className="mb-8">
                <h3 className="font-heading text-lg font-bold text-navy mb-4 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-orange-accent" />
                  {t("products.modalClinicalHeading")}
                </h3>
                <div className="flex flex-col gap-2.5">
                  {(isAr && selectedProduct.clinicalApplicationsAr
                    ? selectedProduct.clinicalApplicationsAr
                    : selectedProduct.clinicalApplications
                  ).map((app, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 p-3 px-4 rounded-lg bg-slate-50 border border-gray-light text-base text-navy font-medium"
                    >
                      <Check
                        size={16}
                        className="text-orange-accent shrink-0"
                      />
                      <span>{app}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer / Direct Inquiry CTA */}
              <div className="flex items-center justify-between gap-4 pt-5 border-t border-gray-light flex-wrap">
                <div>
                  <span className="font-mono text-xs text-orange-accent font-bold uppercase block">
                    {t("products.warrantyBadge")}
                  </span>
                  <strong className="text-base text-navy">
                    {t("products.warrantyText")}
                  </strong>
                </div>

                <Link
                  to="/contact"
                  className="btn btn-primary py-3 px-6 rounded-lg bg-orange-accent border-orange-accent text-white font-bold"
                  onClick={handleCloseModal}
                >
                  {t("products.requestConsultation")}
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CTA SECTION ────────────────────────────────────────── */}
      <section className="py-20 bg-warm-white border-t border-gray-light text-center">
        <div className="container max-w-[860px]">
          <h2 className="font-heading text-[clamp(1.875rem,2.7vw,2.75rem)] font-bold text-navy tracking-[-0.02em] leading-[1.16] mb-5">
            {t("products.ctaHeading")}
          </h2>
          <p className="font-body text-base md:text-lg leading-[1.7] text-navy mb-8">
            {t("products.ctaDesc")}
          </p>
          <Link
            to="/contact"
            className="btn btn-primary gap-2 bg-orange-accent border-orange-accent"
          >
            {t("products.requestQuotation")}
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
};
