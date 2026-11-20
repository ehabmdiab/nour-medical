---
name: nour-medical-suppliers
description: >-
  Regression guardrails and conventions for editing Nour Medical supplier data,
  the Suppliers page, brand styling, and device carousels. Activate whenever
  modifying src/data/companyData.ts, src/pages/SuppliersPage.tsx,
  src/components/organisms/SupplierDeviceCarousel.tsx, or supplier tests.
---

# Nour Medical Suppliers & Brand Invariants

Follow these strict rules before making any change to supplier data, pages, or device showcases to prevent regressions.

## 1. Mandatory Country & Supplier Order (DO NOT ALTER)

The Suppliers page (`src/pages/SuppliersPage.tsx`) and hero country chips MUST ALWAYS appear in this exact country sequence:

1. **01 — 🇺🇸 USA** (`radmedix`)
2. **02 — 🇨🇳 China** (`lonwin`, `angel`, `sinovision`)
3. **03 — 🇹🇼 Taiwan** (`innocare`)

- **Never** reorder `SUPPLIER_PARTNERS` in `src/data/companyData.ts` across country groups when asked to add or update devices for a supplier ("start adding devices with X" means populate X's `devices`, not change the country order).
- Never weaken or reverse the `usaIndex < chinaIndex && chinaIndex < taiwanIndex` regression assertion in `src/pages/SuppliersPage.test.tsx`.

## 2. Device Presentation & Circular Carousel Rules

- **Overflow threshold**: Any supplier with `devices.length > 2` (or `deviceLayout: 'carousel'`) renders inside `<SupplierDeviceCarousel>` (`dots` navigation underneath, no `<` `>` arrow buttons, auto-scrolling circularly from start → end → start). Suppliers with 1–2 devices use the 2-column grid.
- **Image assets**: Store equipment images in `public/images/products/` and reference them with `` `${import.meta.env.BASE_URL}images/products/...` `` so GitHub Pages subpath (`/nour-medical/`) resolves cleanly.
- **Eager loading in carousels**: Keep `loading="eager"` on carousel images so circularly rotating slides render immediately without blank placeholders.
- **Device inspection modal**: Clicking any device image/card opens the native `<dialog>` via `showModal()` showing its localized EN/AR `shortDescription`.

## 3. Typography & Color Rules

- Keep the company name and all section/card headings (`h1`–`h4`) on light surfaces in **navy (`text-navy`)**, never orange (`text-orange-accent`).
- Preserve balanced `16px`-root Tailwind typography across breakpoints.

## 4. Required Verification Checklist

After any edit:

1. Run `npx tsc -b --noEmit` (zero `any` types, no `@ts-ignore` suppressions).
2. Run `npm run lint` (`0` warnings, `0` errors).
3. Run `npm test` and confirm all tests pass, including EN & AR `i18n.test.tsx` key parity and `SuppliersPage.test.tsx` country order checks.
4. Run `npm run build` to verify asset bundling.
