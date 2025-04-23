export interface Character {
  hanzi: string;
  pinyin: string;
  meaning: string;
  distractors: {
    pinyin: string[];
    meaning: string[];
  };
}

export type CharacterSet = "hsk1" | "hsk2" | "hsk3" | "custom";