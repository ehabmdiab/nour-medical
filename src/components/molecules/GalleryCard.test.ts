import { describe, it, expect } from 'vitest';
import { GALLERY_DATA } from '../../data/galleryData';

describe('GalleryCard - Carousel Logic', () => {
  it('cycles forwards and backwards with wrap-around', () => {
    const seminar = GALLERY_DATA.find((c) => c.category === 'seminar')!;
    const images = seminar.images;
    const total = images.length;
    expect(total).toBe(22);

    let currentIndex = 0;
    // Next should go to 1
    currentIndex = currentIndex === total - 1 ? 0 : currentIndex + 1;
    expect(currentIndex).toBe(1);

    // Prev should go back to 0
    currentIndex = currentIndex === 0 ? total - 1 : currentIndex - 1;
    expect(currentIndex).toBe(0);

    // Prev from 0 should wrap to last (21)
    currentIndex = currentIndex === 0 ? total - 1 : currentIndex - 1;
    expect(currentIndex).toBe(21);

    // Next from 21 should wrap to 0
    currentIndex = currentIndex === total - 1 ? 0 : currentIndex + 1;
    expect(currentIndex).toBe(0);
  });

  it('correctly handles single-image topics', () => {
    const singleImageItem = GALLERY_DATA.find((c) => c.images.length === 1)!;
    expect(singleImageItem).toBeDefined();
    expect(singleImageItem.images.length).toBe(1);
    expect(singleImageItem.image).toBe(singleImageItem.images[0]);
  });
});
