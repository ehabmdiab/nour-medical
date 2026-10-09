import { describe, expect, it } from 'vitest';
import {
  arabicEquals,
  arabicIncludes,
  arabicStartsWith,
  formatArabicCurrency,
  formatArabicNumber,
  formatArabicPlural,
  formatEgyptianPhone,
  getArabicPluralCategory,
  getTextDirection,
  hasArabic,
  isArabic,
  isPureArabic,
  isValidEgyptianPhone,
  joinArabicList,
  normalizeAlef,
  normalizeAlefMaksura,
  normalizeArabic,
  normalizeEgyptianPhone,
  normalizeForSearch,
  normalizePersianLetters,
  normalizeTaaMarbuta,
  stripInvisibleChars,
  stripTashkeel,
  stripTatweel,
  toEasternArabicDigits,
  toWesternArabicDigits,
  truncateArabic,
} from './arabic';

describe('Arabic Script Detection & Text Direction', () => {
  it('detects Arabic presence accurately with hasArabic', () => {
    expect(hasArabic('شركة نور الطبية')).toBe(true);
    expect(hasArabic('Nour Medical شركة')).toBe(true);
    expect(hasArabic('Nour Medical Company')).toBe(false);
    expect(hasArabic('')).toBe(false);
  });

  it('determines predominant language with isArabic', () => {
    expect(isArabic('شركة نور للمستلزمات الطبية')).toBe(true);
    expect(isArabic('Nour Medical Devices Co.')).toBe(false);
    expect(isArabic('MRI رنين مغناطيسي طبي')).toBe(true);
    expect(isArabic('MRI System 3D')).toBe(false);
    expect(isArabic('')).toBe(false);
  });

  it('validates pure Arabic text with isPureArabic', () => {
    expect(isPureArabic('شركة نور الطبية')).toBe(true);
    expect(isPureArabic('شركة نور الطبية، القاهرة.')).toBe(true);
    expect(isPureArabic('شركة نور الطبية 2026')).toBe(true);
    expect(isPureArabic('شركة نور الطبية ٢٠٢٦')).toBe(true);
    expect(isPureArabic('Nour Medical')).toBe(false);
    expect(isPureArabic('شركة Nour')).toBe(false);
  });

  it('detects proper reading direction with getTextDirection', () => {
    expect(getTextDirection('شركة نور')).toBe('rtl');
    expect(getTextDirection('Nour Medical')).toBe('ltr');
    expect(getTextDirection('123 شركة')).toBe('rtl');
    expect(getTextDirection('')).toBe('rtl');
  });
});

describe('Diacritics & Normalization', () => {
  it('strips all tashkeel marks and harakat accurately', () => {
    const textWithHarakat = 'شَرِكَةُ نُورٍ الطِّبِّيَّةُ هٰذَا';
    expect(stripTashkeel(textWithHarakat)).toBe('شركة نور الطبية هذا');
  });

  it('strips tatweel (kashida)', () => {
    expect(stripTatweel('مـــــصر')).toBe('مصر');
    expect(stripTatweel('نــــور الطـــبية')).toBe('نور الطبية');
  });

  it('normalizes alef variants to bare alef', () => {
    expect(normalizeAlef('أحمد')).toBe('احمد');
    expect(normalizeAlef('إبراهيم')).toBe('ابراهيم');
    expect(normalizeAlef('آلات')).toBe('الات');
    expect(normalizeAlef('ٱستشفاء')).toBe('استشفاء');
  });

  it('normalizes taa marbuta to haa', () => {
    expect(normalizeTaaMarbuta('شركة')).toBe('شركه');
    expect(normalizeTaaMarbuta('طبية')).toBe('طبيه');
  });

  it('normalizes alef maksura to yaa', () => {
    expect(normalizeAlefMaksura('مستشفى')).toBe('مستشفي');
    expect(normalizeAlefMaksura('على')).toBe('علي');
  });

  it('normalizes Persian letters to Arabic standards', () => {
    expect(normalizePersianLetters('کلینیک')).toBe('كلينيك');
    expect(normalizePersianLetters('پزشکی')).toBe('پزشكي');
  });

  it('strips invisible formatting characters', () => {
    const textWithZWNJ = 'نور\u200Cطبي';
    expect(stripInvisibleChars(textWithZWNJ)).toBe('نورطبي');
  });

  it('handles comprehensive normalization with normalizeArabic', () => {
    const input = 'مُـسْـتَـشْـفَـى الأَمَـــــلِ؛ تِقْنِيَّـةٌ حَدِيثَةٌ';
    const output = normalizeArabic(input);
    expect(output).toBe('مستشفي الامل؛ تقنيه حديثه');
  });
});

describe('Search & Matching', () => {
  it('normalizes text consistently for search', () => {
    expect(normalizeForSearch('  أَجْهِزَةُ   الأَشِعَّةِ  ')).toBe('اجهزه الاشعه');
    expect(normalizeForSearch('رَنِينٌ مَغْنَاطِيسِيٌّ')).toBe('رنين مغناطيسي');
  });

  it('performs fuzzy matching with arabicIncludes', () => {
    const target = 'أحدث أجهزة الرنين المغناطيسي لشركة نور الطبية';
    expect(arabicIncludes(target, 'اجهزه')).toBe(true);
    expect(target.includes('اجهزه')).toBe(false); // standard includes fails due to hamza
    expect(arabicIncludes(target, 'الرَّنِين')).toBe(true);
    expect(arabicIncludes(target, 'طِـبِّـيَّـة')).toBe(true);
    expect(arabicIncludes(target, 'سونار')).toBe(false);
  });

  it('checks prefix match with arabicStartsWith', () => {
    expect(arabicStartsWith('أجهزة طبية متطورة', 'اجهزه')).toBe(true);
    expect(arabicStartsWith('أجهزة طبية متطورة', 'طبيه')).toBe(false);
  });

  it('compares semantic equality with arabicEquals', () => {
    expect(arabicEquals('أحمد', 'احمد')).toBe(true);
    expect(arabicEquals('شَرِكَةٌ', 'شركه')).toBe(true);
    expect(arabicEquals('مستشفى', 'مستشفي')).toBe(true);
    expect(arabicEquals('نور', 'نار')).toBe(false);
  });
});

describe('Numerals & Digits Conversion', () => {
  it('converts Western digits to Eastern Arabic digits', () => {
    expect(toEasternArabicDigits('2026')).toBe('٢٠٢٦');
    expect(toEasternArabicDigits(1500)).toBe('١٥٠٠');
    expect(toEasternArabicDigits('Model 450-X')).toBe('Model ٤٥٠-X');
  });

  it('converts Eastern Arabic and Persian digits to Western digits', () => {
    expect(toWesternArabicDigits('٢٠٢٦')).toBe('2026');
    expect(toWesternArabicDigits('۱۲۳۴۵۶۷۸۹۰')).toBe('1234567890');
    expect(toWesternArabicDigits('القاهرة ٠٢')).toBe('القاهرة 02');
  });

  it('formats numbers with formatArabicNumber', () => {
    expect(formatArabicNumber(1500000)).toBe('1,500,000');
    expect(formatArabicNumber(1500000, { useEasternDigits: true })).toBe('١,٥٠٠,٠٠٠');
    expect(formatArabicNumber(12.5, { minimumFractionDigits: 2 })).toBe('12.50');
  });
});

describe('Arabic Pluralization (CLDR Rules)', () => {
  it('returns the correct plural category', () => {
    expect(getArabicPluralCategory(0)).toBe('zero');
    expect(getArabicPluralCategory(1)).toBe('one');
    expect(getArabicPluralCategory(2)).toBe('two');
    expect(getArabicPluralCategory(3)).toBe('few');
    expect(getArabicPluralCategory(10)).toBe('few');
    expect(getArabicPluralCategory(11)).toBe('many');
    expect(getArabicPluralCategory(99)).toBe('many');
    expect(getArabicPluralCategory(100)).toBe('other');
    expect(getArabicPluralCategory(103)).toBe('few');
    expect(getArabicPluralCategory(125)).toBe('many');
  });

  it('formats count with formatArabicPlural', () => {
    const deviceForms = {
      zero: 'لا توجد أجهزة',
      one: 'جهاز واحد',
      two: 'جهازان',
      few: '{count} أجهزة',
      many: '{count} جهازاً',
      other: '{count} جهاز',
    };

    expect(formatArabicPlural(0, deviceForms)).toBe('لا توجد أجهزة');
    expect(formatArabicPlural(1, deviceForms)).toBe('جهاز واحد');
    expect(formatArabicPlural(2, deviceForms)).toBe('جهازان');
    expect(formatArabicPlural(5, deviceForms)).toBe('5 أجهزة');
    expect(formatArabicPlural(15, deviceForms)).toBe('15 جهازاً');
    expect(formatArabicPlural(100, deviceForms)).toBe('100 جهاز');

    expect(formatArabicPlural(5, deviceForms, { useEasternDigits: true })).toBe('٥ أجهزة');
  });
});

describe('List Joining & Text Truncation', () => {
  it('joins Arabic lists correctly', () => {
    expect(joinArabicList([])).toBe('');
    expect(joinArabicList(['رنين مغناطيسي'])).toBe('رنين مغناطيسي');
    expect(joinArabicList(['رنين مغناطيسي', 'أشعة سينية'])).toBe('رنين مغناطيسي وأشعة سينية');
    expect(joinArabicList(['رنين مغناطيسي', 'أشعة سينية', 'سونار'])).toBe(
      'رنين مغناطيسي، أشعة سينية، وسونار'
    );
  });

  it('truncates Arabic text at word boundary', () => {
    const text = 'توفر شركة نور الطبية أحدث أجهزة الرنين المغناطيسي والقسطرة في مصر';
    const truncated = truncateArabic(text, 25);
    expect(truncated).toBe('توفر شركة نور الطبية...');
    expect(truncated.length).toBeLessThanOrEqual(25);
  });
});

describe('Egyptian Phone Number & Currency Utilities', () => {
  it('normalizes Egyptian phone numbers', () => {
    expect(normalizeEgyptianPhone('010 2351 5373')).toBe('01023515373');
    expect(normalizeEgyptianPhone('+201023515373')).toBe('01023515373');
    expect(normalizeEgyptianPhone('00201023515373')).toBe('01023515373');
    expect(normalizeEgyptianPhone('٠١٠٢٣٥١٥٣٧٣')).toBe('01023515373');
    expect(normalizeEgyptianPhone('02-25267173')).toBe('0225267173');
  });

  it('validates Egyptian phone numbers with isValidEgyptianPhone', () => {
    // Mobiles
    expect(isValidEgyptianPhone('01023515373')).toBe(true);
    expect(isValidEgyptianPhone('01112345678')).toBe(true);
    expect(isValidEgyptianPhone('01223456789')).toBe(true);
    expect(isValidEgyptianPhone('01556789012')).toBe(true);
    expect(isValidEgyptianPhone('01912345678')).toBe(false); // Invalid operator

    // Cairo Landline
    expect(isValidEgyptianPhone('0225267173')).toBe(true);
    // Invalid length
    expect(isValidEgyptianPhone('010123')).toBe(false);
  });

  it('formats Egyptian phone numbers for display', () => {
    expect(formatEgyptianPhone('01023515373', { format: 'national' })).toBe('010 2351 5373');
    expect(formatEgyptianPhone('01023515373', { format: 'international' })).toBe('+20 10 2351 5373');
    expect(formatEgyptianPhone('0225267173', { format: 'national' })).toBe('02 2526 7173');
    expect(formatEgyptianPhone('0225267173', { format: 'international' })).toBe('+20 2 2526 7173');
    expect(
      formatEgyptianPhone('01023515373', { format: 'national', useEasternDigits: true })
    ).toBe('٠١٠ ٢٣٥١ ٥٣٧٣');
  });

  it('formats Arabic currency amounts', () => {
    expect(formatArabicCurrency(150000, { currency: 'EGP', decimals: 0 })).toBe('150,000 ج.م.');
    expect(
      formatArabicCurrency(150000, { currency: 'EGP', decimals: 0, useEasternDigits: true })
    ).toBe('١٥٠,٠٠٠ ج.م.');
    expect(formatArabicCurrency(5000, { currency: 'EGP', display: 'name', decimals: 0 })).toBe(
      '5,000 جنيه مصري'
    );
    expect(formatArabicCurrency(2500, { currency: 'USD', decimals: 2 })).toBe('2,500.00 $');
  });
});
