import { parseScoreTestRequestBodyProps } from "../types";


export const parseScoreTestRequestBody = ({
  basicInformationItem,
  scoreResultItems,
  scoreSelectItems,
  isPublic,
  testType,
}: parseScoreTestRequestBodyProps) => {

  return {
    parsedBasicInformationItem: basicInformationItem
      ? JSON.parse(basicInformationItem)
      : {},
    parsedScoreResultItems: scoreResultItems
      ? JSON.parse(scoreResultItems)
      : [],
    parsedScoreSelectItems: scoreSelectItems
      ? JSON.parse(scoreSelectItems)
      : [],
    parsedIsPublic: isPublic !== undefined ? JSON.parse(isPublic) : false,
    parsedTestType: testType !== undefined ? JSON.parse(testType) : '',
  };
};
