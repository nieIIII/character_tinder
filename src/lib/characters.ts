import { Character } from '../types/character';

// HSK 1 Characters
const hsk1Characters: Character[] = [
  {
    hanzi: "好",
    pinyin: "hǎo",
    meaning: "good",
    distractors: { pinyin: ["máng", "lǎo", "xiè"], meaning: ["busy", "old", "thank you"] }
  },
  {
    hanzi: "忙",
    pinyin: "máng",
    meaning: "busy",
    distractors: { pinyin: ["hǎo", "kĕ", "xiè"], meaning: ["good", "thirsty", "thank you"] }
  },
  {
    hanzi: "谢",
    pinyin: "xiè",
    meaning: "thank you",
    distractors: { pinyin: ["hǎo", "máng", "rè"], meaning: ["good", "busy", "hot"] }
  },
  {
    hanzi: "热",
    pinyin: "rè",
    meaning: "hot",
    distractors: { pinyin: ["lěng", "máng", "xiè"], meaning: ["cold", "busy", "thank you"] }
  },
  {
    hanzi: "冷",
    pinyin: "lěng",
    meaning: "cold",
    distractors: { pinyin: ["rè", "hǎo", "xiè"], meaning: ["hot", "good", "thank you"] }
  },
  {
    hanzi: "水",
    pinyin: "shuǐ",
    meaning: "water",
    distractors: { pinyin: ["chá", "kāfēi", "niú"], meaning: ["tea", "coffee", "cow"] }
  },
  {
    hanzi: "茶",
    pinyin: "chá",
    meaning: "tea",
    distractors: { pinyin: ["shuǐ", "kāfēi", "niú"], meaning: ["water", "coffee", "cow"] }
  },
  {
    hanzi: "牛",
    pinyin: "niú",
    meaning: "cow",
    distractors: { pinyin: ["māo", "gǒu", "jī"], meaning: ["cat", "dog", "chicken"] }
  },
  {
    hanzi: "猫",
    pinyin: "māo",
    meaning: "cat",
    distractors: { pinyin: ["gǒu", "niú", "jī"], meaning: ["dog", "cow", "chicken"] }
  },
  {
    hanzi: "狗",
    pinyin: "gǒu",
    meaning: "dog",
    distractors: { pinyin: ["māo", "niú", "jī"], meaning: ["cat", "cow", "chicken"] }
  },
  {
    hanzi: "一",
    pinyin: "yī",
    meaning: "one",
    distractors: { pinyin: ["èr", "sān", "sì"], meaning: ["two", "three", "four"] }
  },
  {
    hanzi: "二",
    pinyin: "èr",
    meaning: "two",
    distractors: { pinyin: ["yī", "sān", "sì"], meaning: ["one", "three", "four"] }
  },
  {
    hanzi: "三",
    pinyin: "sān",
    meaning: "three",
    distractors: { pinyin: ["èr", "yī", "sì"], meaning: ["two", "one", "four"] }
  },
  {
    hanzi: "四",
    pinyin: "sì",
    meaning: "four",
    distractors: { pinyin: ["wǔ", "liù", "qī"], meaning: ["five", "six", "seven"] }
  },
  {
    hanzi: "五",
    pinyin: "wǔ",
    meaning: "five",
    distractors: { pinyin: ["liù", "qī", "bā"], meaning: ["six", "seven", "eight"] }
  },
  {
    hanzi: "人",
    pinyin: "rén",
    meaning: "person",
    distractors: { pinyin: ["nǚ", "nán", "hái"], meaning: ["woman", "man", "child"] }
  },
  {
    hanzi: "大",
    pinyin: "dà",
    meaning: "big",
    distractors: { pinyin: ["xiǎo", "gāo", "dī"], meaning: ["small", "tall", "low"] }
  },
  {
    hanzi: "小",
    pinyin: "xiǎo",
    meaning: "small",
    distractors: { pinyin: ["dà", "gāo", "dī"], meaning: ["big", "tall", "low"] }
  },
  {
    hanzi: "多",
    pinyin: "duō",
    meaning: "many",
    distractors: { pinyin: ["shǎo", "hǎo", "dà"], meaning: ["few", "good", "big"] }
  },
  {
    hanzi: "少",
    pinyin: "shǎo",
    meaning: "few",
    distractors: { pinyin: ["duō", "dà", "xiǎo"], meaning: ["many", "big", "small"] }
  },
  {
    hanzi: "你",
    pinyin: "nǐ",
    meaning: "you",
    distractors: { pinyin: ["wǒ", "tā", "nǐmen"], meaning: ["I", "he", "you (plural)"] }
  },
  {
    hanzi: "我",
    pinyin: "wǒ",
    meaning: "I",
    distractors: { pinyin: ["nǐ", "tā", "wǒmen"], meaning: ["you", "he", "we"] }
  },
  {
    hanzi: "他",
    pinyin: "tā",
    meaning: "he",
    distractors: { pinyin: ["wǒ", "nǐ", "tāmen"], meaning: ["I", "you", "they"] }
  },
  {
    hanzi: "她",
    pinyin: "tā",
    meaning: "she",
    distractors: { pinyin: ["tā", "nǐ", "wǒ"], meaning: ["he", "you", "I"] }
  },
  {
    hanzi: "我们",
    pinyin: "wǒmen",
    meaning: "we",
    distractors: { pinyin: ["nǐmen", "tāmen", "zánmen"], meaning: ["you (plural)", "they", "we (inclusive)"] }
  },
  {
    hanzi: "你们",
    pinyin: "nǐmen",
    meaning: "you (plural)",
    distractors: { pinyin: ["wǒmen", "tāmen", "nǐ"], meaning: ["we", "they", "you"] }
  },
  {
    hanzi: "他们",
    pinyin: "tāmen",
    meaning: "they (male/mixed)",
    distractors: { pinyin: ["wǒmen", "nǐmen", "tā"], meaning: ["we", "you (plural)", "he"] }
  },
  {
    hanzi: "是",
    pinyin: "shì",
    meaning: "to be",
    distractors: { pinyin: ["zài", "yǒu", "bú"], meaning: ["at", "to have", "not"] }
  },
  {
    hanzi: "不",
    pinyin: "bù",
    meaning: "not",
    distractors: { pinyin: ["méi", "bú", "shì"], meaning: ["not (past)", "not (alt)", "to be"] }
  },
  {
    hanzi: "有",
    pinyin: "yǒu",
    meaning: "to have",
    distractors: { pinyin: ["méiyǒu", "shì", "zài"], meaning: ["not have", "to be", "at"] }
  },
  {
    hanzi: "没",
    pinyin: "méi",
    meaning: "not (past)",
    distractors: { pinyin: ["bù", "yǒu", "méiyǒu"], meaning: ["not", "to have", "don't have"] }
  },
  {
    hanzi: "这",
    pinyin: "zhè",
    meaning: "this",
    distractors: { pinyin: ["nà", "zhǐ", "zhe"], meaning: ["that", "only", "(particle)"] }
  },
  {
    hanzi: "那",
    pinyin: "nà",
    meaning: "that",
    distractors: { pinyin: ["zhè", "zhǐ", "nèi"], meaning: ["this", "only", "that (colloquial)"] }
  },
  {
    hanzi: "哪",
    pinyin: "nǎ",
    meaning: "which",
    distractors: { pinyin: ["nà", "zhè", "shénme"], meaning: ["that", "this", "what"] }
  },
  {
    hanzi: "谁",
    pinyin: "shéi",
    meaning: "who",
    distractors: { pinyin: ["nǎ", "shénme", "nǐ"], meaning: ["which", "what", "you"] }
  },
  {
    hanzi: "什么",
    pinyin: "shénme",
    meaning: "what",
    distractors: { pinyin: ["nǎ", "shéi", "zhè"], meaning: ["which", "who", "this"] }
  },
  {
    hanzi: "几",
    pinyin: "jǐ",
    meaning: "how many",
    distractors: { pinyin: ["duōshao", "shénme", "nǎ"], meaning: ["how many (big)", "what", "which"] }
  },
  {
    hanzi: "和",
    pinyin: "hé",
    meaning: "and",
    distractors: { pinyin: ["gēn", "yě", "zài"], meaning: ["with", "also", "at"] }
  },
  {
    hanzi: "在",
    pinyin: "zài",
    meaning: "at",
    distractors: { pinyin: ["shì", "yǒu", "zǒu"], meaning: ["to be", "to have", "to walk"] }
  },
  {
    hanzi: "呢",
    pinyin: "ne",
    meaning: "question particle",
    distractors: { pinyin: ["ma", "le", "de"], meaning: ["yes/no particle", "past", "possessive"] }
  },
  {
    hanzi: "吗",
    pinyin: "ma",
    meaning: "yes/no question particle",
    distractors: { pinyin: ["ne", "le", "de"], meaning: ["(contextual question)", "past", "possessive"] }
  }
];

// HSK 2 Characters
const hsk2Characters: Character[] = [
  {
    hanzi: "学",
    pinyin: "xué",
    meaning: "study",
    distractors: { pinyin: ["kàn", "tīng", "shuō"], meaning: ["read", "listen", "speak"] }
  },
  {
    hanzi: "看",
    pinyin: "kàn",
    meaning: "look/read",
    distractors: { pinyin: ["xué", "tīng", "shuō"], meaning: ["study", "listen", "speak"] }
  },
  {
    hanzi: "听",
    pinyin: "tīng",
    meaning: "listen",
    distractors: { pinyin: ["kàn", "xué", "shuō"], meaning: ["read", "study", "speak"] }
  },
  {
    hanzi: "说",
    pinyin: "shuō",
    meaning: "speak",
    distractors: { pinyin: ["tīng", "kàn", "xué"], meaning: ["listen", "read", "study"] }
  }
];

// HSK 3 Characters
const hsk3Characters: Character[] = [
  {
    hanzi: "经济",
    pinyin: "jīngjì",
    meaning: "economy",
    distractors: { pinyin: ["zhèngzhì", "wénhuà", "kēxué"], meaning: ["politics", "culture", "science"] }
  },
  {
    hanzi: "政治",
    pinyin: "zhèngzhì",
    meaning: "politics",
    distractors: { pinyin: ["jīngjì", "wénhuà", "kēxué"], meaning: ["economy", "culture", "science"] }
  },
  {
    hanzi: "文化",
    pinyin: "wénhuà",
    meaning: "culture",
    distractors: { pinyin: ["jīngjì", "zhèngzhì", "kēxué"], meaning: ["economy", "politics", "science"] }
  }
];

// Get custom characters from localStorage
const getCustomCharacters = (): Character[] => {
  const saved = localStorage.getItem('customCharacters');
  return saved ? JSON.parse(saved) : [];
};

export const characterSets = {
  hsk1: hsk1Characters,
  hsk2: hsk2Characters,
  hsk3: hsk3Characters,
  custom: getCustomCharacters(),
};

export type CharacterSet = keyof typeof characterSets;

export const getAllCharacters = (): Character[] => {
  return Object.values(characterSets).flat();
};

export const getCharacterSet = (set: CharacterSet): Character[] => {
  return set === 'custom' ? getCustomCharacters() : characterSets[set];
};

export const addCustomCharacter = (character: Omit<Character, "distractors">) => {
  const customCharacters = getCustomCharacters();
  
  // Create distractors from existing characters
  const allCharacters = getAllCharacters();
  const randomPinyin = allCharacters
    .filter(c => c.pinyin !== character.pinyin)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(c => c.pinyin);

  const randomMeaning = allCharacters
    .filter(c => c.meaning !== character.meaning)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(c => c.meaning);

  const newCharacter: Character = {
    ...character,
    distractors: {
      pinyin: randomPinyin,
      meaning: randomMeaning
    }
  };

  customCharacters.push(newCharacter);
  localStorage.setItem('customCharacters', JSON.stringify(customCharacters));
  return newCharacter;
};