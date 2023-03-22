
export interface ResultItem {
  resultContent: string;
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
  resultContent: string;
  score: number;
}

interface BasicInformationItem {
  title: string;
  subTitle: string;
  explain: string;
  thumbnailImgUrl: string;
}

export interface BasePersonalityTest {
  basicInformationItem: BasicInformationItem;
  isPublic: boolean
  testType: string;
  userId: string;
}

export interface ScoreTypeTest extends BasePersonalityTest{
  scoreResultItems: ResultItem[];
  scoreSelectItems: OptionValuesToSelect[];
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
  mbtiResultItems: ResultItem[];
  mbtiSelectItems: mbtiOptions[];
}


