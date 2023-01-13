import { Types } from "mongoose";

export interface ResultItem {
  typeContent: string;
  explanationContent: string;
}

export interface Personality {
  title: string;
  explain: string;
}

export interface PersonalityItem extends Personality {
  items: OptionValuesToSelect[];
}

export interface OptionValuesToSelect {
  selectItems: Options[];
}

interface Options {
  question: string;
  optionItems: OptionItems[];
}

interface OptionItems {
  option: string;
  weightedScoreItems: WeightedScoreItem[];
}

interface WeightedScoreItem {
  typeContent: string;
  score: number;
}
