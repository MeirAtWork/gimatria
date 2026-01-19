
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

export function calculateMiluy(word: string) {
  const letters = word.replace(/[^א-ת]/g, '').split('');
  let totalValue = 0;
  
  const breakdown = letters.map((char) => {
    const data = miluyMap[char] || { full: char, value: 0 };
    totalValue += data.value;
    return { char, ...data };
  });

  return { breakdown, totalValue };
}
