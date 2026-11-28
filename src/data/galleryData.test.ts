import { describe, it, expect } from 'vitest';
import { GALLERY_DATA, GALLERY_CATEGORIES } from './galleryData';
import type { GalleryCategoryType } from './galleryData';

describe('Gallery Data - Team, Exhibitions, and Events Categorization', () => {
  it('consolidates gallery items into 10 authentic field cards (excluding relocated client hospital photos)', () => {
    expect(GALLERY_DATA.length).toBe(10);
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
      'gal-machines-9',
      'gal-machines-19',
      'gal-machines-20',
      'gal-machines-21',
    ];
    for (const mid of machineIds) {
      expect(GALLERY_DATA.find((item) => item.id === mid)).toBeUndefined();
    }
  });

  it('contains valid properties for each gallery card', () => {
    for (const card of GALLERY_DATA) {
      expect(card.id).toBeTruthy();
      expect(card.title).toBeTruthy();
      expect(['team', 'exhibitions']).toContain(card.category);
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
    const seminar = GALLERY_DATA.find((c) => c.id === 'gal-seminar-73');
    expect(seminar).toBeDefined();
    expect(seminar?.title).toBe('Nour Medical Company Scientific Seminar — 10 July 2025');
    expect(seminar?.titleAr).toBe('الندوة العلمية لشركة / نور للهندسة الطبية — ١٠ يوليو ٢٠٢٥');
    expect(seminar?.descriptionAr).toContain('الحدث العلمى الدورى لشركة / نور للهندسة الطبية');
    expect(seminar?.category).toBe('exhibitions');
    expect(seminar?.images.length).toBe(21);

    const guests = GALLERY_DATA.find((c) => c.id === 'gal-seminar-guests');
    expect(guests).toBeDefined();
    expect(guests?.category).toBe('exhibitions');
    expect(guests?.image).toContain('seminar-dsc00636.jpg');

    const symposium = GALLERY_DATA.find(
      (c) => c.title === 'VIP Clinical Leadership & Radiology Symposium'
    );
    expect(symposium).toBeDefined();
    expect(symposium?.category).toBe('exhibitions');
    expect(symposium?.image).toContain('symposium-dsc00652.jpg');
    expect(symposium?.images[1]).toContain('seminar-dsc00346.jpg');
    expect(symposium?.images[2]).toContain('symposium-session-02.jpg');
    expect(symposium?.images[15]).toContain('symposium-session-15.jpg');
    expect(symposium?.images[16]).toContain('symposium-session-16.jpg');
    expect(symposium?.images[27]).toContain('seminar-dsc00791.jpg');
    expect(symposium?.images.some((src) => src.includes('doctor-session-dsc00442.jpg'))).toBe(false);
    expect(new Set(symposium?.images).size).toBe(symposium?.images.length);
    expect(symposium?.images.length).toBe(42);

    const techTeam = GALLERY_DATA.find(
      (c) => c.title === 'Nour Medical Engineering & Technical Team'
    );
    expect(techTeam).toBeDefined();
    expect(techTeam?.category).toBe('team');
    expect(techTeam?.images.length).toBe(11);
    expect(techTeam?.images.some((src) => src.includes('dsc00636'))).toBe(false);
  });

  it('filters by category matching category labels and counts', () => {
    const categoryCounts: Record<GalleryCategoryType, number> = {
      all: 10,
      team: 4,
      exhibitions: 6,
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

  it('keeps client facility photos out of the gallery (they live on the Clients page)', () => {
    for (const card of GALLERY_DATA) {
      expect(card.id.startsWith('gal-clients-')).toBe(false);
      expect(['gal-team-gouna', 'gal-team-tayseer', 'gal-team-ramadan']).not.toContain(card.id);
      for (const src of card.images) {
        expect(src).not.toContain('images/clients/');
        expect(src).not.toContain('team-gouna-deployment.jpg');
        expect(src).not.toContain('team-hospital-support.jpg');
        expect(src).not.toContain('team-ramadan-celebration.jpg');
      }
    }
    expect(GALLERY_CATEGORIES.find((c) => (c.id as string) === 'events')).toBeUndefined();
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
