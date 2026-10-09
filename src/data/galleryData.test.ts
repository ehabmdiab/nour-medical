import { describe, it, expect } from 'vitest';
import { GALLERY_DATA, GALLERY_CATEGORIES } from './galleryData';
import type { GalleryCategoryType } from './galleryData';

describe('Gallery Data - Team, Exhibitions, and Events Categorization', () => {
  it('consolidates gallery items into exactly 30 authentic field cards', () => {
    expect(GALLERY_DATA.length).toBe(30);
  });

  it('eliminates standalone equipment brochure cards from gallery', () => {
    // Equipment brochure items must not exist in gallery (relocated to Products)
    const machineIds = [
      'gal-machines-1',
      'gal-machines-2',
      'gal-machines-3',
      'gal-machines-4',
      'gal-machines-5',
      'gal-machines-6',
      'gal-machines-7',
      'gal-machines-8',
      'gal-machines-19',
      'gal-machines-20',
    ];
    for (const mid of machineIds) {
      expect(GALLERY_DATA.find((item) => item.id === mid)).toBeUndefined();
    }
  });

  it('contains valid properties for each gallery card', () => {
    for (const card of GALLERY_DATA) {
      expect(card.id).toBeTruthy();
      expect(card.title).toBeTruthy();
      expect(['team', 'exhibitions', 'events']).toContain(card.category);
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

  it('groups key events, conferences, and teams with correct image counts', () => {
    const seminar = GALLERY_DATA.find((c) => c.title === 'Nour Medical Annual Scientific Seminar — 10 July 2025');
    expect(seminar).toBeDefined();
    expect(seminar?.category).toBe('exhibitions');
    expect(seminar?.images.length).toBe(22);

    const symposium = GALLERY_DATA.find(
      (c) => c.title === 'VIP Clinical Leadership & Radiology Symposium'
    );
    expect(symposium).toBeDefined();
    expect(symposium?.category).toBe('exhibitions');
    expect(symposium?.images.length).toBe(18);

    const techTeam = GALLERY_DATA.find(
      (c) => c.title === 'Nour Medical Engineering & Technical Team'
    );
    expect(techTeam).toBeDefined();
    expect(techTeam?.category).toBe('team');
    expect(techTeam?.images.length).toBe(12);

    const goldenHeart = GALLERY_DATA.find(
      (c) => c.title === 'Golden Heart Specialized Cardiac Center'
    );
    expect(goldenHeart).toBeDefined();
    expect(goldenHeart?.category).toBe('events');
    expect(goldenHeart?.images.length).toBe(4);
  });

  it('filters by category matching category labels and counts', () => {
    const categoryCounts: Record<GalleryCategoryType, number> = {
      all: 30,
      team: 6,
      exhibitions: 7,
      events: 17,
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
