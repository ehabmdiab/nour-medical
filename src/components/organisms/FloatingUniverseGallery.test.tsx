import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FloatingUniverseGallery } from "./FloatingUniverseGallery";
import { LanguageProvider } from "../../i18n";
import { FLOATING_GALLERY_DATA } from "../../data/floatingGalleryData";

describe("FloatingUniverseGallery Component", () => {
  it("renders floating universe gallery container and category filters in English", () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="en">
        <FloatingUniverseGallery />
      </LanguageProvider>
    );
    expect(html).toContain("floating-universe-section");
    expect(html).toContain("Medical Imaging Universe");
    expect(html).toContain("All Showcase");
  });

  it("renders floating universe gallery in Arabic", () => {
    const html = renderToString(
      <LanguageProvider defaultLocale="ar">
        <FloatingUniverseGallery />
      </LanguageProvider>
    );
    expect(html).toContain("floating-universe-section");
    expect(html).toContain("عالم التصوير الطبي التفاعلي");
    expect(html).toContain("جميع المعروضات");
  });

  it("keeps client facility photos out of the home gallery (they live on the Clients page)", () => {
    for (const item of FLOATING_GALLERY_DATA) {
      expect(item.imageUrl).not.toContain("images/clients/");
    }
  });
});
