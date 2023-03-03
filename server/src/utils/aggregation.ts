

type TestTypeDIc = Record<string, Record<string, string>>;

const TEST_TYPE_DIC: TestTypeDIc = {
    score: { resultItemsFrom: 'resultitems', selectItemsFrom: 'selectitems' },
    mbti: { resultItemsFrom: 'resultitems', selectItemsFrom: 'mbtiselectitems' },
};

export const detailPersonalityItemsLookup = (testType: string) => [
    {
      $lookup: {
        from: TEST_TYPE_DIC[testType].resultItemsFrom,
        localField: 'resultItems',
        foreignField: '_id',
        as: 'resultItems',
      },
    },
    {
      $unwind: '$resultItems',
    },
    {
      $lookup: {
        from: TEST_TYPE_DIC[testType].selectItemsFrom,
        localField: 'selectItems',
        foreignField: '_id',
        as: 'selectItems',
      },
    },
    {
      $unwind: '$selectItems',
    },
    {
      $project: {
        basicInformationItems: { title: '$title', explain: '$explain' },
        author: 1,
        isPublic: 1,
        testType: 1,
        selectItems: '$selectItems.selectItems',
        resultItems: '$resultItems.resultItems',
        _id: 0,
      },
    },
  ];