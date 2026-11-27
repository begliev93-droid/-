// Все надписи в кадре — через tr(). Второй язык добавляется сюда.
const DICT: Record<string, Record<string, string>> = {
  en: {'ЕР ТӨСТІК': 'ER TOSTIK', '1-бөлім: Сегіз аға': 'Part 1: Eight Brothers', 'ЖҰТ': 'THE GREAT FREEZE', 'ТӨСТІК': 'TOSTIK', 'ӨСУ': 'GROWING UP', 'ӨРМЕК': 'THE LOOM', 'АСЫҚ': 'ASYK', 'ЖОЛ': 'THE ROAD', 'АС': 'THE FEAST', 'ЖЫЛҚЫ ЖҮРМЕЙДІ': 'THE STUBBORN HERD', 'ҮЙГЕ': 'HOME', 'ТОҒЫЗ СЫРҒА': 'NINE EARRINGS', 'СҮЙІНШІ!': 'GOOD NEWS!', 'ЖАЛҒАСЫ БАР...': 'TO BE CONTINUED...', 'СЕГІЗ АҒА?': 'EIGHT BROTHERS?', '2-бөлім жақында': 'Part 2 coming soon'},
};
let LANG = 'kk';
export const setLang = (l: string) => { LANG = l; };
export const tr = (s: string) => (LANG === 'kk' ? s : DICT[LANG]?.[s] ?? s);
