

type TestTypeDIc = Record<string, Record<string, string>>;


const TEST_TYPE_DIC: TestTypeDIc = {
  score: {
    resultItemsFrom: 'scoreresultitems',
    selectItemsFrom: 'scoreselectitems',
    selectItemsLocalField: 'scoreSelectItems',
    resultItemsLocalField: 'scoreResultItems',
  },
  mbti: {
    resultItemsFrom: 'mbtiresultitems',
    selectItemsFrom: 'mbtiselectitems',
    selectItemsLocalField: 'mbtiSelectItems',
    resultItemsLocalField: 'mbtiResultItems',
  },
  'true-or-false': {
    resultItemsFrom: 'trueorfalseresultitems',
    selectItemsFrom: 'trueorfalseselectitems',
    selectItemsLocalField: 'trueOrFalseSelectItems',
    resultItemsLocalField: 'trueOrFalseResultItems',
  },
};


export const detailPersonalityItemsLookup = (testType: string) => [
    {
      $lookup: {
        from: TEST_TYPE_DIC[testType].resultItemsFrom,
        localField: TEST_TYPE_DIC[testType].resultItemsLocalField,
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
        localField: TEST_TYPE_DIC[testType].selectItemsLocalField,
        foreignField: '_id',
        as: 'selectItems',
      },
    },
    {
      $unwind: '$selectItems',
    },
    {
      $project: {
        basicInformationItems: { title: '$title', subTitle: '$subTitle', explain: '$explain' },
        author: 1,
        isPublic: 1,
        testType: 1,
        thumbnailImgUrl: 1,
        selectItems: '$selectItems.selectItems',
        resultItems: '$resultItems.resultItems',
        _id: 0,
      },
    },
  ];

  export const personalityItemLookupByMbtiType = () => [
    {
      $lookup: {
        from: 'mbtiselectitems',
        localField: 'mbtiSelectItems',
        foreignField: '_id',
        pipeline: [
          { $project: { _id: 0, radioButtonItems:0, radioButtonIndex: 0 } },
        ],
        as: 'selectItems',
      },
    },
    {
      $unwind: '$selectItems',
    },
    {
      $project: {
        basicInformationItems: { title: '$title', subTitle: '$subTitle', explain: '$explain' },
        author: 1,
        testType: 1,
        selectItems: '$selectItems.selectItems',
        _id: 0,
      },
    },
  ]

  export const personalityItemLookupByScoreType = () => [
    {
      $lookup: {
        from: 'selectitems',
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
        basicInformationItems: { title: '$title', subTitle: '$subTitle', explain: '$explain' },
        id: 1,
        author: 1,
        testType: 1,
        selectItems: '$selectItems.selectItems',
        _id: 0,
      },
    },
]

export const getPersonalityItemLookup = (testType: string) => {
  switch (testType) {
    case 'score': {
      return [
        {
          $lookup: {
            from: 'selectitems',
            localField: 'selectItems',
            foreignField: '_id',
            as: 'selectItems',
          },
        },
        {
          $unwind: '$selectItems',
        },
      ];
    }

    case 'mbti': {
      return [
        {
          $lookup: {
            from: 'mbtiselectitems',
            localField: 'mbtiSelectItems',
            foreignField: '_id',
            pipeline: [
              {
                $project: { _id: 0 ,"selectItems.question":1, "selectItems.optionItems": 1 },
              },
            ],
            as: 'selectItems',
          },
        },
        {
          $unwind: '$selectItems',
        },
      ];
    }
    default: {
      return []
    }
  }
};

export const getPersonalityItemProject = () => [
  {
    $project: {
      basicInformationItems: { title: '$title', subTitle: '$subTitle', explain: '$explain' },
      id: 1,
      author: 1,
      testType: 1,
      isPublic: 1,
      selectItems: '$selectItems.selectItems',
      _id: 0,
    },
  },
];
