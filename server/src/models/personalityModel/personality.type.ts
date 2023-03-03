
export interface ResultItem {
  typeContent: string;
  explanationContent: string;
}

export interface Personality {
  title: string;
  explain: string;
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

interface BasicInformationItem {
  title: string;
  explain: string;
}

export interface BasePersonalityTest {
  basicInformationItem: BasicInformationItem;
  isPublic: boolean
  testType: string;
  userId: string;
}

export interface ScoreTypeTest extends BasePersonalityTest{
  typeItems: ResultItem[];
  selectItems: OptionValuesToSelect[];
}


interface RadioButtonItems {
  text: string;
  boolean: boolean;
  id: string;
  htmlFor: string;
}


interface mbtiOptions extends Options {
  radioButtonIndex: string;
  radioButtonItems: RadioButtonItems[];
}


export interface MbtiTypeTest extends BasePersonalityTest{
  mbtiTypeItems: ResultItem[];
  mbtiSelectItems: mbtiOptions[];
}


