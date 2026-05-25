import { RANK_MEANINGS } from './tarot-meanings';
export interface TarotCard {
    id: number;
    name: string;
  
    symbol: string;
    keyword: string;
    element: string;
    color: string;
  
    selected?: boolean;
  }
  
  const MAJOR_ARCANA: TarotCard[] = [
    {
      id: 0,
      name: 'The Fool',
      symbol: '☼',
      keyword: 'การเริ่มต้นใหม่',
      element: 'Air',
      color: '#ffe39a',
    },
    {
      id: 1,
      name: 'The Magician',
      symbol: '✦',
      keyword: 'พลังและความสามารถ',
      element: 'Mercury',
      color: '#c084fc',
    },
    {
      id: 2,
      name: 'The High Priestess',
      symbol: '☾',
      keyword: 'สัญชาตญาณ',
      element: 'Moon',
      color: '#93c5fd',
    },
    {
      id: 3,
      name: 'The Empress',
      symbol: '❀',
      keyword: 'ความอุดมสมบูรณ์',
      element: 'Venus',
      color: '#f9a8d4',
    },
    {
      id: 4,
      name: 'The Emperor',
      symbol: '♜',
      keyword: 'อำนาจและความมั่นคง',
      element: 'Fire',
      color: '#fb923c',
    },
    {
      id: 5,
      name: 'The Hierophant',
      symbol: '✞',
      keyword: 'ศรัทธา',
      element: 'Earth',
      color: '#fde68a',
    },
    {
      id: 6,
      name: 'The Lovers',
      symbol: '♥',
      keyword: 'ความสัมพันธ์',
      element: 'Air',
      color: '#ff8fb1',
    },
    {
      id: 7,
      name: 'The Chariot',
      symbol: '✧',
      keyword: 'ชัยชนะ',
      element: 'Water',
      color: '#67e8f9',
    },
    {
      id: 8,
      name: 'Strength',
      symbol: '♌',
      keyword: 'ความกล้าหาญ',
      element: 'Fire',
      color: '#fca5a5',
    },
    {
      id: 9,
      name: 'The Hermit',
      symbol: '☽',
      keyword: 'ค้นหาคำตอบ',
      element: 'Earth',
      color: '#d8b4fe',
    },
    {
      id: 10,
      name: 'Wheel of Fortune',
      symbol: '☯',
      keyword: 'โชคชะตา',
      element: 'Jupiter',
      color: '#fde68a',
    },
    {
      id: 11,
      name: 'Justice',
      symbol: '⚖',
      keyword: 'ความยุติธรรม',
      element: 'Air',
      color: '#fef08a',
    },
    {
      id: 12,
      name: 'The Hanged Man',
      symbol: '☥',
      keyword: 'การเสียสละ',
      element: 'Water',
      color: '#93c5fd',
    },
    {
      id: 13,
      name: 'Death',
      symbol: '☠',
      keyword: 'การเปลี่ยนแปลง',
      element: 'Scorpio',
      color: '#9ca3af',
    },
    {
      id: 14,
      name: 'Temperance',
      symbol: '⚗',
      keyword: 'สมดุล',
      element: 'Fire',
      color: '#fdba74',
    },
    {
      id: 15,
      name: 'The Devil',
      symbol: '♆',
      keyword: 'ความลุ่มหลง',
      element: 'Capricorn',
      color: '#f87171',
    },
    {
      id: 16,
      name: 'The Tower',
      symbol: '⚡',
      keyword: 'การพังทลาย',
      element: 'Mars',
      color: '#fb7185',
    },
    {
      id: 17,
      name: 'The Star',
      symbol: '✶',
      keyword: 'ความหวัง',
      element: 'Aquarius',
      color: '#93c5fd',
    },
    {
      id: 18,
      name: 'The Moon',
      symbol: '☾',
      keyword: 'ความลึกลับ',
      element: 'Pisces',
      color: '#c4b5fd',
    },
    {
      id: 19,
      name: 'The Sun',
      symbol: '☀',
      keyword: 'ความสำเร็จ',
      element: 'Sun',
      color: '#fde047',
    },
    {
      id: 20,
      name: 'Judgement',
      symbol: '♇',
      keyword: 'การตื่นรู้',
      element: 'Fire',
      color: '#fda4af',
    },
    {
      id: 21,
      name: 'The World',
      symbol: '◎',
      keyword: 'ความสมบูรณ์',
      element: 'Saturn',
      color: '#86efac',
    },
  ];
  
  const SUITS = [
    {
      name: 'Wands',
      symbol: '♆',
      color: '#fb923c',
      element: 'Fire',
    },
    {
      name: 'Cups',
      symbol: '☕',
      color: '#67e8f9',
      element: 'Water',
    },
    {
      name: 'Swords',
      symbol: '⚔',
      color: '#cbd5e1',
      element: 'Air',
    },
    {
      name: 'Pentacles',
      symbol: '✪',
      color: '#fde68a',
      element: 'Earth',
    },
  ];
  
  const RANKS = [
    'Ace',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Page',
    'Knight',
    'Queen',
    'King',
  ];
  
  const MINOR_ARCANA: TarotCard[] = SUITS.flatMap(
    (suit, suitIndex) =>
      RANKS.map((rank, rankIndex) => {
  
        const rankMeaning =
          RANK_MEANINGS[rank];
  
        return {
  
          id: 22 + suitIndex * 14 + rankIndex,
  
          name: `${rank} of ${suit.name}`,
  
          symbol: suit.symbol,
  
          keyword:
            rankMeaning.keyword,
  
          element: suit.element,
  
          color: suit.color,
  
        };
  
      })
  );
  
  export const TAROT_DECK: TarotCard[] = [
    ...MAJOR_ARCANA,
    ...MINOR_ARCANA,
  ];