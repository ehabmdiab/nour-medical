/**
 * Comprehensive, high-precision Arabic utility library.
 * Designed for localization, string normalization, search, numerals, and Egyptian medical application contexts.
 */

// ============================================================================
// 1. CONSTANTS & UNICODE RANGES
// ============================================================================

/**
 * Regular expression matching Arabic script characters (letters, diacritics, presentation forms, and digits).
 */
export const ARABIC_SCRIPT_REGEX =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

/**
 * Regular expression matching Arabic Tashkeel (Harakat / Diacritics) and Quranic marks.
 * Includes: Fathatan, Dammatan, Kasratan, Fatha, Damma, Kasra, Shadda, Sukun,
 * Maddah, Hamza above/below, Dagger Alef (Alif Khanjariyah), and Quranic annotations.
 */
export const TASHKEEL_REGEX =
  /[\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED]/g;

/**
 * Regular expression matching Tatweel (Kashida) character: ـ (U+0640).
 */
export const TATWEEL_REGEX = /\u0640/g;

/**
 * Regular expression matching Eastern Arabic (Indic) digits (٠-٩) and Persian/Urdu digits (۰-۹).
 */
export const EASTERN_DIGITS_REGEX = /[\u0660-\u0669\u06F0-\u06F9]/g;

/**
 * Eastern Arabic (Indic) digits array: 0 -> ٠, ..., 9 -> ٩.
 */
export const EASTERN_ARABIC_DIGITS: readonly string[] = [
  '٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩',
] as const;

/**
 * Map of Eastern Arabic and Persian/Urdu digits to Western ASCII digits.
 */
export const DIGIT_MAP_TO_WESTERN: Readonly<Record<string, string>> = {
  // Eastern Arabic (Indic) digits
  '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
  '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
  // Persian / Urdu variants
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
  '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
} as const;

// ============================================================================
// 2. TYPES & INTERFACES
// ============================================================================

export type TextDirection = 'rtl' | 'ltr';

export interface ArabicNormalizeOptions {
  /** Remove diacritics / harakat (e.g. َ ُ ِ ّ ْ ً ٌ ٍ). Default: true */
  stripDiacritics?: boolean;
  /** Remove tatweel / kashida (ـ). Default: true */
  stripTatweel?: boolean;
  /** Normalize Alef variants (أ, إ, آ, ٱ) to bare Alef (ا). Default: true */
  normalizeAlef?: boolean;
  /** Normalize Taa Marbuta (ة) to Haa (ه). Default: true */
  normalizeTaaMarbuta?: boolean;
  /** Normalize Alef Maksura (ى) to Yaa (ي). Default: true */
  normalizeAlefMaksura?: boolean;
  /** Normalize Persian Kaf (ک) to Arabic Kaf (ك) and Persian Yeh (ی) to Yaa (ي). Default: true */
  normalizePersianLetters?: boolean;
  /** Normalize Hamza forms (ئ, ؤ) to isolated Hamza (ء). Default: false */
  normalizeHamza?: boolean;
  /** Convert Eastern/Persian digits to Western ASCII digits. Default: false */
  convertDigitsToWestern?: boolean;
  /** Strip zero-width non-joiners and formatting characters. Default: true */
  stripInvisibleChars?: boolean;
}

export type ArabicPluralCategory = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

export interface ArabicPluralForms {
  /** Form for 0 items (e.g. "لا توجد أجهزة") */
  zero?: string;
  /** Form for 1 item (e.g. "جهاز واحد") */
  one: string;
  /** Form for 2 items (e.g. "جهازان") */
  two?: string;
  /** Form for 3-10 items (e.g. "{count} أجهزة") */
  few: string;
  /** Form for 11-99 items (e.g. "{count} جهازاً") */
  many?: string;
  /** Form for 100+ items or fractional quantities (e.g. "{count} جهاز") */
  other: string;
}

export interface EgyptianPhoneFormatOptions {
  /** Output style: 'national' (e.g. 010 1234 5678) or 'international' (+20 10 1234 5678). Default: 'national' */
  format?: 'national' | 'international';
  /** Convert digits to Eastern Arabic numerals. Default: false */
  useEasternDigits?: boolean;
}

export interface CurrencyFormatOptions {
  /** Currency code or symbol. Default: 'EGP' */
  currency?: 'EGP' | 'SAR' | 'AED' | 'USD' | 'EUR';
  /** Currency label display mode. Default: 'symbol' */
  display?: 'symbol' | 'code' | 'name';
  /** Convert digits to Eastern Arabic numerals. Default: false */
  useEasternDigits?: boolean;
  /** Number of decimal places. Default: 2 */
  decimals?: number;
}

// ============================================================================
// 3. DETECTION & TEXT DIRECTION
// ============================================================================

/**
 * Checks if the given text contains any Arabic characters.
 */
export function hasArabic(text: string): boolean {
  if (!text) return false;
  return ARABIC_SCRIPT_REGEX.test(text);
}

/**
 * Checks if the string is predominantly Arabic (excluding whitespace, numbers, and common punctuation).
 */
export function isArabic(text: string): boolean {
  if (!text) return false;
  const arabicLetters = text.match(/[\u0621-\u064A\u0671-\u06D3\u06D5]/g) || [];
  const latinLetters = text.match(/[A-Za-z]/g) || [];
  return arabicLetters.length > latinLetters.length;
}

/**
 * Checks if all non-whitespace and non-punctuation characters in the text are Arabic.
 */
export function isPureArabic(
  text: string,
  options: { allowDigits?: boolean; allowPunctuation?: boolean; allowWhitespace?: boolean } = {}
): boolean {
  if (!text) return false;
  const { allowDigits = true, allowPunctuation = true, allowWhitespace = true } = options;

  let pattern = '^[\u0621-\u064A\u0671-\u06D3\u06D5\u064B-\u065F\u0670\u0640';
  if (allowDigits) {
    pattern += '0-9\u0660-\u0669\u06F0-\u06F9';
  }
  if (allowPunctuation) {
    pattern += '.,!?:;،؛؟\\-\'"()\\[\\]{}٪٫٬';
  }
  if (allowWhitespace) {
    pattern += '\\s';
  }
  pattern += ']+$';

  return new RegExp(pattern).test(text);
}

/**
 * Detects the reading direction of a string based on the first strong directional character.
 * Helpful for dynamic bi-directional UI elements.
 */
export function getTextDirection(text: string, defaultDir: TextDirection = 'rtl'): TextDirection {
  if (!text) return defaultDir;
  // Match first strong directional character
  const match = text.match(/[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]|[A-Za-z\u00C0-\u024F]/);
  if (!match) return defaultDir;
  const code = match[0].charCodeAt(0);
  // Arabic/Hebrew RTL unicode block ranges
  if (
    (code >= 0x0591 && code <= 0x07ff) ||
    (code >= 0xfb1d && code <= 0xfdfd) ||
    (code >= 0xfe70 && code <= 0xfefc)
  ) {
    return 'rtl';
  }
  return 'ltr';
}

// ============================================================================
// 4. DIACRITICS & NORMALIZATION
// ============================================================================

/**
 * Strips all Arabic diacritical marks (Tashkeel / Harakat), including Tanween, Shadda, Sukun,
 * and Quranic annotations.
 */
export function stripTashkeel(text: string): string {
  if (!text) return '';
  return text.replace(TASHKEEL_REGEX, '');
}

/**
 * Removes Tatweel (Kashida) elongation characters (ـ).
 */
export function stripTatweel(text: string): string {
  if (!text) return '';
  return text.replace(TATWEEL_REGEX, '');
}

/**
 * Normalizes all Alef forms (أ, إ, آ, ٱ) into a bare Alef (ا).
 */
export function normalizeAlef(text: string): string {
  if (!text) return '';
  return text.replace(/[أإآٱ]/g, 'ا');
}

/**
 * Normalizes Taa Marbuta (ة) to Haa (ه).
 */
export function normalizeTaaMarbuta(text: string): string {
  if (!text) return '';
  return text.replace(/ة/g, 'ه');
}

/**
 * Normalizes Alef Maksura (ى) to Yaa (ي).
 */
export function normalizeAlefMaksura(text: string): string {
  if (!text) return '';
  return text.replace(/ى/g, 'ي');
}

/**
 * Normalizes Persian letters (ک -> ك, ی -> ي).
 */
export function normalizePersianLetters(text: string): string {
  if (!text) return '';
  return text.replace(/ک/g, 'ك').replace(/ی/g, 'ي');
}

/**
 * Strips invisible zero-width characters (ZWNJ, ZWJ, LRM, RLM).
 */
export function stripInvisibleChars(text: string): string {
  if (!text) return '';
  return text.replace(/[\u200B-\u200F\uFEFF]/g, '');
}

/**
 * Comprehensive configurable Arabic string normalization.
 */
export function normalizeArabic(text: string, options: ArabicNormalizeOptions = {}): string {
  if (!text) return '';

  const {
    stripDiacritics: shouldStripDiacritics = true,
    stripTatweel: shouldStripTatweel = true,
    normalizeAlef: shouldNormalizeAlef = true,
    normalizeTaaMarbuta: shouldNormalizeTaaMarbuta = true,
    normalizeAlefMaksura: shouldNormalizeAlefMaksura = true,
    normalizePersianLetters: shouldNormalizePersian = true,
    normalizeHamza: shouldNormalizeHamza = false,
    convertDigitsToWestern: shouldConvertDigits = false,
    stripInvisibleChars: shouldStripInvisible = true,
  } = options;

  let result = text;

  if (shouldStripInvisible) {
    result = stripInvisibleChars(result);
  }
  if (shouldStripDiacritics) {
    result = stripTashkeel(result);
  }
  if (shouldStripTatweel) {
    result = stripTatweel(result);
  }
  if (shouldNormalizeAlef) {
    result = normalizeAlef(result);
  }
  if (shouldNormalizeTaaMarbuta) {
    result = normalizeTaaMarbuta(result);
  }
  if (shouldNormalizeAlefMaksura) {
    result = normalizeAlefMaksura(result);
  }
  if (shouldNormalizePersian) {
    result = normalizePersianLetters(result);
  }
  if (shouldNormalizeHamza) {
    result = result.replace(/[ئؤ]/g, 'ء');
  }
  if (shouldConvertDigits) {
    result = toWesternArabicDigits(result);
  }

  return result;
}

// ============================================================================
// 5. SEARCH & COMPARISON
// ============================================================================

/**
 * Normalizes text for search indexing and fuzzy querying.
 * Removes diacritics, tatweel, unifies alef, taa marbuta, alef maksura,
 * converts digits to western, collapses whitespace, and lowercases.
 */
export function normalizeForSearch(text: string): string {
  if (!text) return '';
  const normalized = normalizeArabic(text, {
    stripDiacritics: true,
    stripTatweel: true,
    normalizeAlef: true,
    normalizeTaaMarbuta: true,
    normalizeAlefMaksura: true,
    normalizePersianLetters: true,
    convertDigitsToWestern: true,
    stripInvisibleChars: true,
  });

  return normalized
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * High-precision Arabic substring match that ignores diacritics, tatweel, and letter variations.
 */
export function arabicIncludes(source: string, search: string): boolean {
  if (!source || !search) return false;
  return normalizeForSearch(source).includes(normalizeForSearch(search));
}

/**
 * Checks if source begins with search term, taking Arabic normalization into account.
 */
export function arabicStartsWith(source: string, search: string): boolean {
  if (!source || !search) return false;
  return normalizeForSearch(source).startsWith(normalizeForSearch(search));
}

/**
 * Compares two Arabic strings for semantic equality after normalization.
 */
export function arabicEquals(a: string, b: string): boolean {
  return normalizeForSearch(a) === normalizeForSearch(b);
}

// ============================================================================
// 6. NUMERALS & DIGITS CONVERSION
// ============================================================================

/**
 * Converts Western ASCII digits (0-9) to Eastern Arabic (Indic) numerals (٠-٩).
 */
export function toEasternArabicDigits(input: string | number): string {
  const str = String(input);
  return str.replace(/\d/g, (digit) => {
    const idx = Number.parseInt(digit, 10);
    return EASTERN_ARABIC_DIGITS[idx] ?? digit;
  });
}

/**
 * Converts Eastern Arabic (Indic) and Persian/Urdu digits to Western ASCII digits (0-9).
 */
export function toWesternArabicDigits(input: string): string {
  if (!input) return '';
  return input.replace(EASTERN_DIGITS_REGEX, (digit) => DIGIT_MAP_TO_WESTERN[digit] ?? digit);
}

/**
 * Formats a number for Egyptian/Arabic locale, with optional Eastern digits.
 */
export function formatArabicNumber(
  num: number,
  options: { useEasternDigits?: boolean; minimumFractionDigits?: number; maximumFractionDigits?: number } = {}
): string {
  const { useEasternDigits = false, minimumFractionDigits = 0, maximumFractionDigits = 2 } = options;
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(num);

  return useEasternDigits ? toEasternArabicDigits(formatted) : formatted;
}

// ============================================================================
// 7. ARABIC PLURALIZATION (CLDR RULES)
// ============================================================================

/**
 * Computes the Arabic plural category according to the Unicode CLDR standard:
 * - 'zero': count === 0
 * - 'one': count === 1
 * - 'two': count === 2
 * - 'few': count % 100 in [3..10]
 * - 'many': count % 100 in [11..99]
 * - 'other': 100, 101, 102, 200, or non-integer
 */
export function getArabicPluralCategory(count: number): ArabicPluralCategory {
  const abs = Math.abs(count);
  if (abs === 0) return 'zero';
  if (abs === 1) return 'one';
  if (abs === 2) return 'two';

  if (Number.isInteger(abs)) {
    const mod100 = abs % 100;
    if (mod100 >= 3 && mod100 <= 10) return 'few';
    if (mod100 >= 11 && mod100 <= 99) return 'many';
  }

  return 'other';
}

/**
 * Formats an item count with the grammatically correct Arabic plural form.
 * Automatically replaces '{count}' placeholder if present, or prepends formatted number.
 */
export function formatArabicPlural(
  count: number,
  forms: ArabicPluralForms,
  options: { useEasternDigits?: boolean } = {}
): string {
  const { useEasternDigits = false } = options;
  const category = getArabicPluralCategory(count);
  const countStr = useEasternDigits ? toEasternArabicDigits(count) : String(count);

  let template: string;
  switch (category) {
    case 'zero':
      template = forms.zero ?? forms.other;
      break;
    case 'one':
      template = forms.one;
      break;
    case 'two':
      template = forms.two ?? forms.other;
      break;
    case 'few':
      template = forms.few;
      break;
    case 'many':
      template = forms.many ?? forms.other;
      break;
    case 'other':
    default:
      template = forms.other;
      break;
  }

  if (template.includes('{count}')) {
    return template.replace(/\{count\}/g, countStr);
  }

  // If zero, one, or two templates don't contain {count}, return them directly (e.g. "جهازان")
  if (category === 'zero' || category === 'one' || category === 'two') {
    return template;
  }

  return `${countStr} ${template}`;
}

// ============================================================================
// 8. STRING HELPERS & LIST FORMATTING
// ============================================================================

/**
 * Joins an array of items with Arabic commas (،) and a conjunction (e.g. و).
 * In proper Arabic typography, "و" is attached directly to the last item.
 */
export function joinArabicList(items: readonly string[], conjunction = 'و'): string {
  const valid = items.filter((item) => Boolean(item && item.trim()));
  if (valid.length === 0) return '';
  if (valid.length === 1) return valid[0];
  if (valid.length === 2) {
    return `${valid[0]} ${conjunction}${valid[1]}`;
  }

  const allExceptLast = valid.slice(0, -1).join('، ');
  const last = valid[valid.length - 1];
  return `${allExceptLast}، ${conjunction}${last}`;
}

/**
 * Truncates an Arabic string at a word boundary, avoiding broken ligatures or dangling diacritics.
 */
export function truncateArabic(
  text: string,
  maxLength: number,
  options: { suffix?: string } = {}
): string {
  if (!text || text.length <= maxLength) return text;
  const { suffix = '...' } = options;
  const targetLength = Math.max(0, maxLength - suffix.length);

  const sub = text.slice(0, targetLength);
  const lastSpaceIndex = sub.lastIndexOf(' ');

  const truncated = lastSpaceIndex > 0 ? sub.slice(0, lastSpaceIndex) : sub;
  // Clean trailing punctuation, diacritics, and tatweel
  const cleaned = truncated.replace(/[\s،؛؟.,ـ\u064B-\u065F]+$/, '');
  return `${cleaned}${suffix}`;
}

// ============================================================================
// 9. EGYPTIAN PHONE & CURRENCY HELPERS
// ============================================================================

/**
 * Normalizes an Egyptian phone number by removing spaces, dashes,
 * converting Eastern digits to Western, and unifying prefixes (0020 / +20).
 */
export function normalizeEgyptianPhone(phone: string): string {
  if (!phone) return '';
  // Convert digits & strip non-digit characters except leading +
  let cleaned = toWesternArabicDigits(phone).replace(/[^\d+]/g, '');

  // Handle +20 or 0020 international prefix
  if (cleaned.startsWith('+20')) {
    cleaned = `0${cleaned.slice(3)}`;
  } else if (cleaned.startsWith('0020')) {
    cleaned = `0${cleaned.slice(4)}`;
  } else if (cleaned.startsWith('20') && cleaned.length >= 11) {
    cleaned = `0${cleaned.slice(2)}`;
  }

  return cleaned;
}

/**
 * Validates whether the given string is a valid Egyptian mobile or landline phone number.
 * - Mobile: 11 digits starting with 010, 011, 012, 015.
 * - Landline (Cairo/Giza): 10 digits starting with 02.
 * - Landline (Alexandria): 9 digits starting with 03.
 * - Other Governorates: 9-10 digits starting with valid area codes (040, 050, 066, etc.).
 */
export function isValidEgyptianPhone(phone: string): boolean {
  const normalized = normalizeEgyptianPhone(phone);
  // Egyptian mobile: 01[0125]XXXXXXX (11 digits)
  const isMobile = /^01[0125]\d{8}$/.test(normalized);
  // Egyptian landlines: 02 (Cairo/Giza: 10 digits total), 03..09 (9-10 digits total)
  const isLandline = /^0[234589]\d{7,8}$/.test(normalized);

  return isMobile || isLandline;
}

/**
 * Formats an Egyptian phone number for display.
 * Example national: "010 2351 5373" or "02 2526 7173"
 * Example international: "+20 10 2351 5373" or "+20 2 2526 7173"
 */
export function formatEgyptianPhone(
  phone: string,
  options: EgyptianPhoneFormatOptions = {}
): string {
  const { format = 'national', useEasternDigits = false } = options;
  const normalized = normalizeEgyptianPhone(phone);

  if (!isValidEgyptianPhone(phone)) {
    // If not matching valid pattern, return raw normalized or with Eastern digits
    return useEasternDigits ? toEasternArabicDigits(normalized) : normalized;
  }

  let formatted = normalized;

  // Mobile format: 010 1234 5678
  if (/^01[0125]\d{8}$/.test(normalized)) {
    const operator = normalized.slice(0, 3);
    const part1 = normalized.slice(3, 7);
    const part2 = normalized.slice(7, 11);

    formatted =
      format === 'international'
        ? `+20 ${operator.slice(1)} ${part1} ${part2}`
        : `${operator} ${part1} ${part2}`;
  } else if (/^02\d{8}$/.test(normalized)) {
    // Cairo landline: 02 2526 7173
    const code = normalized.slice(0, 2);
    const part1 = normalized.slice(2, 6);
    const part2 = normalized.slice(6, 10);

    formatted =
      format === 'international'
        ? `+20 ${code.slice(1)} ${part1} ${part2}`
        : `${code} ${part1} ${part2}`;
  } else if (/^0\d{8,9}$/.test(normalized)) {
    // Other landlines: 0X XXXX XXXX
    const code = normalized.slice(0, 3);
    const remaining = normalized.slice(3);
    formatted =
      format === 'international'
        ? `+20 ${code.slice(1)} ${remaining}`
        : `${code} ${remaining}`;
  }

  return useEasternDigits ? toEasternArabicDigits(formatted) : formatted;
}

/**
 * Formats an amount into Arabic currency representation (default: Egyptian Pound EGP / ج.م.).
 */
export function formatArabicCurrency(
  amount: number,
  options: CurrencyFormatOptions = {}
): string {
  const {
    currency = 'EGP',
    display = 'symbol',
    useEasternDigits = false,
    decimals = 2,
  } = options;

  const formattedNum = formatArabicNumber(amount, {
    useEasternDigits,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  const currencySymbols: Record<string, { symbol: string; name: string }> = {
    EGP: { symbol: 'ج.م.', name: 'جنيه مصري' },
    SAR: { symbol: 'ر.س.', name: 'ريال سعودي' },
    AED: { symbol: 'د.إ.', name: 'درهم إماراتي' },
    USD: { symbol: '$', name: 'دولار أمريكي' },
    EUR: { symbol: '€', name: 'يورو' },
  };

  const label =
    display === 'code'
      ? currency
      : display === 'name'
      ? (currencySymbols[currency]?.name ?? currency)
      : (currencySymbols[currency]?.symbol ?? currency);

  return `${formattedNum} ${label}`;
}
