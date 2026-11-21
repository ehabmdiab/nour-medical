import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  SupplierDeviceCard,
  SupplierDeviceCarousel,
} from '../components/organisms/SupplierDeviceCarousel';
import { SUPPLIER_PARTNERS, type SupplierDevice, type SupplierPartner } from '../data/companyData';
import { useReveal } from '../hooks/useReveal';
import { useLanguage } from '../i18n';

export const SuppliersPage: React.FC = () => {
  const { locale, t } = useLanguage();
  const isAr = locale === 'ar';
  const { ref: suppliersRef, visible: suppliersVisible } = useReveal();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selectedDevice, setSelectedDevice] = useState<{
    device: SupplierDevice;
    supplierName: string;
  } | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.setAttribute('closedby', 'any');
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !selectedDevice) return;
    if (typeof dialog.showModal === 'function' && !dialog.open) {
      dialog.showModal();
    }
  }, [selectedDevice]);

  const closeDeviceDialog = () => {
    const dialog = dialogRef.current;
    if (dialog && typeof dialog.close === 'function' && dialog.open) {
      dialog.close();
    }
    setSelectedDevice(null);
  };

  const handleDialogBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || e.target !== dialog) return;
    if (e.clientX === 0 && e.clientY === 0) return;
    const rect = dialog.getBoundingClientRect();
    const clickedOutside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;
    if (clickedOutside) {
      closeDeviceDialog();
    }
  };

  const countryGroups = useMemo(() => {
    const groups: { country: string; countryAr?: string; partners: SupplierPartner[] }[] = [];
    for (const partner of SUPPLIER_PARTNERS) {
      const existing = groups.find((g) => g.country === partner.country);
      if (existing) {
        existing.partners.push(partner);
      } else {
        groups.push({
          country: partner.country,
          countryAr: partner.countryAr,
          partners: [partner],
        });
      }
    }
    return groups;
  }, []);

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-white to-warm-white bg-[image:var(--bg-hero-light)] hero-section-pad pb-14 md:pb-16 text-navy relative overflow-hidden border-b border-gray-light z-[1]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,22,40,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,22,40,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute -right-[6%] -top-[18%] w-[680px] h-[680px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.035)_0%,rgba(251,146,60,0.015)_42%,transparent_72%)] pointer-events-none" />

        <div className="container relative z-10">
          <div className="section-label">
            {t('suppliers.heroLabel')}
          </div>
          <h1 className="font-heading text-[clamp(2.25rem,3.6vw,3.375rem)] font-bold text-navy tracking-tight leading-[1.16] max-w-[1040px] mb-6">
            {t('suppliers.heroTitle1')}{' '}
            <span className="text-navy">{t('suppliers.heroTitle2')}</span>
          </h1>
          <p className="font-body text-base md:text-lg leading-[1.7] text-navy max-w-[860px]">
            {t('suppliers.heroSubtitle')}
          </p>

          {/* Country Tags */}
          <div className="flex gap-4 mt-12 flex-wrap">
            {[t('suppliers.countryUSA'), t('suppliers.countryChina'), t('suppliers.countryTaiwan')].map((country) => (
              <span
                key={country}
                className="font-body text-sm tracking-wide text-navy font-semibold bg-white px-5 py-2.5 rounded-full border border-gray-light shadow-[0_2px_8px_rgba(10,22,40,0.04)]"
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Suppliers Grid */}
      <section
        ref={suppliersRef}
        className={`py-[var(--section-gap)] bg-white motion-safe:transition-opacity motion-safe:duration-700 ease-out ${
          suppliersVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container">
          <div className="mb-12">
            <div className="section-label">{t('suppliers.sectionLabel')}</div>
            <h2 className="font-heading text-[clamp(1.875rem,2.7vw,2.75rem)] font-bold text-navy tracking-tight leading-tight">
              {t('suppliers.sectionTitle')}
            </h2>
          </div>

          <div className="flex flex-col">
            {countryGroups.map((group, groupIdx) => {
              const countryLabel = isAr && group.countryAr ? group.countryAr : group.country;

              return (
                <div
                  key={group.country}
                  className={`grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-12 items-start py-16 ${
                    groupIdx < countryGroups.length - 1 ? 'border-b border-gray-light' : ''
                  } motion-safe:transition-all motion-safe:duration-500 ${
                    suppliersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                  }`}
                  style={{
                    transitionDelay: `${groupIdx * 0.15}s`,
                  }}
                >
                  {/* Left: Country + Number */}
                  <div>
                    <div className="font-heading text-3xl md:text-4xl font-bold text-navy leading-none mb-4">
                      {String(groupIdx + 1).padStart(2, '0')}
                    </div>
                    <span className="inline-block font-body text-sm tracking-wide text-navy font-bold border border-gray-light bg-warm-white px-3.5 py-1.5 rounded-xs">
                      {countryLabel}
                    </span>
                  </div>

                  {/* Right: Grouped Suppliers of the Same Country */}
                  <div className="min-w-0 flex flex-col gap-12">
                    {group.partners.map((partner) => {
                      const name = isAr && partner.nameAr ? partner.nameAr : partner.name;
                      const tagline = isAr && partner.taglineAr ? partner.taglineAr : partner.tagline;
                      const description = isAr && partner.descriptionAr ? partner.descriptionAr : partner.description;
                      const specialties = isAr && partner.specialtiesAr ? partner.specialtiesAr : partner.specialties;

                      return (
                        <div key={partner.id} className="flex flex-col gap-6 min-w-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                            {/* Center: Name + Tagline + Description */}
                            <div className="min-w-0">
                              <h3 className="font-heading text-xl md:text-2xl font-bold text-navy tracking-tight mb-2 break-words">
                                {name}
                              </h3>
                              <p className="font-body text-sm tracking-wide uppercase text-navy/80 font-bold mb-4 break-words">
                                {tagline}
                              </p>
                              <p className="font-body text-base leading-[1.7] text-navy break-words">
                                {description}
                              </p>
                            </div>

                            {/* Right: Specialties */}
                            <div className="min-w-0">
                              <p className="font-heading text-sm tracking-widest uppercase text-navy font-bold mb-4">
                                {t('suppliers.specialtiesLabel')}
                              </p>
                              <ul className="flex flex-col gap-2.5">
                                {specialties.map((s) => (
                                  <li key={s} className="flex items-start gap-2.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-accent shrink-0 mt-2.5" />
                                    <span className="font-body text-base text-navy leading-normal">
                                      {s}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Supplier Devices Showcase (Grid or Moving Carousel) */}
                          {partner.devices && partner.devices.length > 0 && (
                            <div className="pt-2">
                              <p className="font-heading text-sm tracking-widest uppercase text-navy font-bold mb-4">
                                {t('suppliers.devicesLabel')}
                              </p>
                              {partner.deviceLayout === 'carousel' || partner.devices.length > 2 ? (
                                <SupplierDeviceCarousel
                                  supplierName={name}
                                  devices={partner.devices}
                                  isAr={isAr}
                                  isPausedExternally={selectedDevice !== null}
                                  onSelectDevice={(device, supplierName) =>
                                    setSelectedDevice({ device, supplierName })
                                  }
                                />
                              ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {partner.devices.map((device) => (
                                    <SupplierDeviceCard
                                      key={device.id}
                                      device={device}
                                      supplierName={name}
                                      isAr={isAr}
                                      onSelect={(selected, supplierName) =>
                                        setSelectedDevice({ device: selected, supplierName })
                                      }
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Network Statement */}
      <section className="py-20 bg-warm-white border-t border-gray-light">
        <div className="container max-w-[960px] text-center">
          <div className="section-label justify-center mb-6">
            {t('suppliers.quoteLabel')}
          </div>
          <p className="font-heading text-xl md:text-2xl font-semibold text-navy leading-snug tracking-tight">
            {t('suppliers.quoteText')}
          </p>
        </div>
      </section>

      {/* Native Device Description Dialog */}
      <dialog
        ref={dialogRef}
        aria-labelledby="supplier-device-dialog-title"
        onClose={() => setSelectedDevice(null)}
        onClick={handleDialogBackdropClick}
        className="m-auto w-[min(92vw,680px)] max-h-[90vh] overflow-y-auto rounded-lg border border-gray-light bg-white p-0 text-navy shadow-[0_24px_64px_rgba(10,22,40,0.22)] backdrop:bg-navy/55 backdrop:backdrop-blur-[2px]"
      >
        {selectedDevice && (
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4 border-b border-gray-light px-6 py-5 bg-warm-white">
              <div className="min-w-0">
                <p className="font-body text-xs font-bold uppercase tracking-widest text-navy/75 mb-1 break-words">
                  {selectedDevice.supplierName} ·{' '}
                  {isAr ? selectedDevice.device.categoryAr : selectedDevice.device.category}
                </p>
                <h2
                  id="supplier-device-dialog-title"
                  className="font-heading text-xl md:text-2xl font-bold text-navy leading-snug break-words"
                >
                  {isAr ? selectedDevice.device.nameAr : selectedDevice.device.name}
                </h2>
              </div>
              <button
                type="button"
                autoFocus
                onClick={closeDeviceDialog}
                aria-label={t('suppliers.closeDialog')}
                className="shrink-0 w-9 h-9 rounded-full border border-gray-light bg-white text-navy hover:bg-navy hover:text-white transition-colors flex items-center justify-center font-heading text-base font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-white p-6 flex items-center justify-center border-b border-gray-light/70">
              <img
                src={selectedDevice.device.image}
                alt={isAr ? selectedDevice.device.nameAr : selectedDevice.device.name}
                className="max-h-[340px] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-6">
              <p className="font-body text-base leading-[1.75] text-navy">
                {isAr
                  ? selectedDevice.device.shortDescriptionAr
                  : selectedDevice.device.shortDescription}
              </p>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
};

export const PartnersPage = SuppliersPage;
