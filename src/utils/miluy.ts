
export const miluyMap: Record<string, { full: string; value: number }> = {
  'א': { full: 'אלף', value: 111 },
  'ב': { full: 'בית', value: 412 },
  'ג': { full: 'גימל', value: 83 },
  'ד': { full: 'דלת', value: 434 },
  'ה': { full: 'הא', value: 6 }, // מילוי סטנדרטי, לעיתים הה
  'ו': { full: 'ויו', value: 22 },
  'ז': { full: 'זין', value: 67 },
  'ח': { full: 'חית', value: 418 },
  'ט': { full: 'טית', value: 419 },
  'י': { full: 'יוד', value: 20 },
  'כ': { full: 'כף', value: 100 },
  'ך': { full: 'כף', value: 100 },
  'ל': { full: 'למד', value: 74 },
  'מ': { full: 'מם', value: 80 },
  'ם': { full: 'מם', value: 80 },
  'נ': { full: 'נון', value: 106 },
  'ן': { full: 'נון', value: 106 },
  'ס': { full: 'סמך', value: 120 },
  'ע': { full: 'עין', value: 130 },
  'פ': { full: 'פא', value: 81 },
  'ף': { full: 'פא', value: 81 },
  'צ': { full: 'צדי', value: 104 },
  'ץ': { full: 'צדי', value: 104 },
  'ק': { full: 'קוף', value: 186 },
  'ר': { full: 'ריש', value: 510 },
  'ש': { full: 'שין', value: 360 },
  'ת': { full: 'תיו', value: 416 },
};

const gematriaValues: Record<string, number> = {
  'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
  'י': 10, 'כ': 20, 'ל': 30, 'מ': 40, 'נ': 50, 'ס': 60, 'ע': 70, 'פ': 80, 'צ': 90,
  'ק': 100, 'ר': 200, 'ש': 300, 'ת': 400,
  'ך': 20, 'ם': 40, 'ן': 50, 'ף': 80, 'ץ': 90
};

function getStringValue(str: string): number {
  return str.split('').reduce((acc, char) => acc + (gematriaValues[char] || 0), 0);
}

export type MiluyType = 'yodin' | 'alephin' | 'hehin';

export function calculateMiluy(word: string, miluyType: MiluyType = 'alephin') {
  const letters = word.replace(/[^א-ת]/g, '').split('');
  let totalValue = 0;
  let totalSuffixValue = 0;
  let totalBasicValue = 0;
  
  const getOverride = (char: string): string | null => {
    if (char === 'ה') {
      if (miluyType === 'yodin') return 'הי';
      if (miluyType === 'alephin') return 'הא';
      if (miluyType === 'hehin') return 'הה';
    }
    if (char === 'ו') {
      if (miluyType === 'yodin') return 'ויו';
      if (miluyType === 'alephin') return 'ואו';
      if (miluyType === 'hehin') return 'וו';
    }
    return null;
  };

  const breakdown = letters.map((char) => {
    let data = miluyMap[char] || { full: char, value: 0 };
    
    // Override logic
    const overrideFull = getOverride(char);
    if (overrideFull) {
        data = { full: overrideFull, value: getStringValue(overrideFull) };
    }

    const suffix = data.full.substring(1);
    const suffixValue = getStringValue(suffix);
    const basicValue = gematriaValues[char] || 0;
    
    totalValue += data.value;
    totalSuffixValue += suffixValue;
    totalBasicValue += basicValue;

    return { char, ...data, suffix, suffixValue, basicValue };
  });

  return { breakdown, totalValue, totalSuffixValue, totalBasicValue };
}
