import { ParseScoreTestRequestBodyProps, ParseMbtiTestRequestBodyProps, ParseTrueOrFalseTestRequestBodyProps } from "../types";


export const parseScoreTestRequestBody = ({
  basicInformationItem,
  scoreResultItems,
  scoreSelectItems,
  isPublic,
  testType,
}: ParseScoreTestRequestBodyProps) => {

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


export const parseMbtiTestRequestBody = ({
  basicInformationItem,
  mbtiResultItems,
  mbtiSelectItems,
  isPublic,
  testType,
}: ParseMbtiTestRequestBodyProps) => {

  return {
    parsedBasicInformationItem: basicInformationItem
      ? JSON.parse(basicInformationItem)
      : {},
    parsedMbtiResultItems: mbtiResultItems
      ? JSON.parse(mbtiResultItems)
      : [],
    parsedMbtiSelectItems: mbtiSelectItems
      ? JSON.parse(mbtiSelectItems)
      : [],
    parsedIsPublic: isPublic !== undefined ? JSON.parse(isPublic) : false,
    parsedTestType: testType !== undefined ? JSON.parse(testType) : '',
  };
};


export const parseTrueOrFalseTestRequestBody = ({
  basicInformationItem,
  trueOrFalseTestResultFormItems,
  trueOrFalseTestSelectFormItems,
  isPublic,
  testType,
}: ParseTrueOrFalseTestRequestBodyProps) => {

  return {
    parsedBasicInformationItem: basicInformationItem
      ? JSON.parse(basicInformationItem)
      : {},
    parsedTrueOrFalseResultItems: trueOrFalseTestResultFormItems
      ? JSON.parse(trueOrFalseTestResultFormItems)
      : [],
    parsedTrueOrFalseSelectItems: trueOrFalseTestSelectFormItems
      ? JSON.parse(trueOrFalseTestSelectFormItems)
      : [],
    parsedIsPublic: isPublic !== undefined ? JSON.parse(isPublic) : false,
    parsedTestType: testType !== undefined ? JSON.parse(testType) : '',
  };
};
