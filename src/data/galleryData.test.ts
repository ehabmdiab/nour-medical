import { describe, it, expect } from 'vitest';
import { GALLERY_DATA, GALLERY_CATEGORIES } from './galleryData';
import type { GalleryCategoryType } from './galleryData';

describe('Gallery Data - Topic Consolidation', () => {
  it('consolidates the same topic into one card across all categories', () => {
    expect(GALLERY_DATA.length).toBe(38);
  });

  it('preserves all 133 images without losing any photos', () => {
    const totalImages = GALLERY_DATA.reduce((acc, item) => acc + item.images.length, 0);
    expect(totalImages).toBe(133);
  });

  it('consolidates Prof. Dr. Ashraf Zaytoun images into a single card with 3 images', () => {
    const ashraf = GALLERY_DATA.find((c) => c.title === 'Prof. Dr. Ashraf Zaytoun');
    expect(ashraf).toBeDefined();
    expect(ashraf?.images.length).toBe(3);
    expect(ashraf?.imageDetails?.length).toBe(3);

    // Ensure repetitive duplicate cards are no longer present
    const consultant = GALLERY_DATA.find((c) => c.title === 'Senior Clinical Radiology Consultant');
    const specialist = GALLERY_DATA.find((c) => c.title === 'Interventional Radiology Specialist');
    expect(consultant).toBeUndefined();
    expect(specialist).toBeUndefined();
  });

  it('contains valid properties for each card', () => {
    for (const card of GALLERY_DATA) {
      expect(card.id).toBeTruthy();
      expect(card.title).toBeTruthy();
      expect(card.category).toBeTruthy();
      expect(card.categoryLabel).toBeTruthy();
      expect(card.location).toBeTruthy();
      expect(card.description).toBeTruthy();
      expect(card.image).toBeTruthy();
      expect(card.images.length).toBeGreaterThanOrEqual(1);
      expect(card.images[0]).toBe(card.image);
      expect(card.date).toBeTruthy();
      expect(card.specs).toBeTruthy();
    }
  });

  it('groups key events and facilities with correct image counts', () => {
    const seminar = GALLERY_DATA.find((c) => c.category === 'seminar');
    expect(seminar).toBeDefined();
    expect(seminar?.title).toBe('Nour Medical Annual Scientific Seminar — 10 July 2025');
    expect(seminar?.images.length).toBe(22);

    const symposium = GALLERY_DATA.find(
      (c) => c.title === 'VIP Clinical Leadership & Radiology Symposium'
    );
    expect(symposium).toBeDefined();
    expect(symposium?.images.length).toBe(18);

    const techTeam = GALLERY_DATA.find(
      (c) => c.title === 'Nour Medical Engineering & Technical Team'
    );
    expect(techTeam).toBeDefined();
    expect(techTeam?.images.length).toBe(12);

    const angelPres = GALLERY_DATA.find(
      (c) => c.title === 'Angel Radiology Technology Presentation'
    );
    expect(angelPres).toBeDefined();
    expect(angelPres?.images.length).toBe(10);

    const lonwinPres = GALLERY_DATA.find(
      (c) => c.title === 'Lonwin Medical Diagnostic Imaging Demonstration'
    );
    expect(lonwinPres).toBeDefined();
    expect(lonwinPres?.images.length).toBe(10);

    const alMarwa = GALLERY_DATA.find((c) => c.title === 'Al-Marwa Hospital');
    expect(alMarwa).toBeDefined();
    expect(alMarwa?.images.length).toBe(4);

    const goldenHeart = GALLERY_DATA.find(
      (c) => c.title === 'Golden Heart Specialized Cardiac Center'
    );
    expect(goldenHeart).toBeDefined();
    expect(goldenHeart?.images.length).toBe(4);
  });

  it('filters by category matching category labels and counts', () => {
    const categoryCounts: Record<GalleryCategoryType, number> = {
      all: 38,
      machines: 12,
      hospitals: 17,
      doctors: 4,
      team: 4,
      seminar: 1,
    };

    for (const cat of GALLERY_CATEGORIES) {
      if (cat.id === 'all') {
        expect(GALLERY_DATA.length).toBe(categoryCounts.all);
      } else {
        const filtered = GALLERY_DATA.filter((item) => item.category === cat.id);
        expect(filtered.length).toBe(categoryCounts[cat.id]);
      }
    }
  });

  it('has detailed captions matching images length for multi-image cards', () => {
    const multiImageCards = GALLERY_DATA.filter((item) => item.images.length > 1);
    expect(multiImageCards.length).toBeGreaterThan(0);

    for (const card of multiImageCards) {
      expect(card.imageDetails).toBeDefined();
      expect(card.imageDetails?.length).toBe(card.images.length);
    }
  });
});
