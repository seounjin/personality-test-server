import { CustomRoute, METHOD } from "../types";
import {
  getPersonality,
  getPersonalityItem,
  getPersonalityTestResult,
  getMyPersonalityTest,
  deleteScoreTypeTest,
  getDetailPersonalityItems,
  updateScoreTestType ,
  setMbtiTypeTest,
  setScoreTypeTest,
  updateMbtiTestType,
  deleteMbtiTypeTest,
  setTrueOrFalseTypeTest,
  deleteTrueOrFalseTypeTest,
  updateTrueOrFalseTestType,
} from "../controllers/personality.controller";
import auth from "../middleware/auth";
import checkPublic from "../middleware/checkPublic";
import checkDetailPersonality from "../middleware/checkDetailPersonality";


const personalityRoute: CustomRoute[] = [
    {
      method: METHOD.GET,
      route: "/api/v1/personality/my-personality",
      handler: [auth, getMyPersonalityTest]
    },
    {
      method: METHOD.GET,
      route: "/api/v1/personality/:type/:id",
      handler: [auth, checkDetailPersonality, getDetailPersonalityItems]
    },
    {
      method: METHOD.PUT,
      route: "/api/v1/personality/score/:id",
      handler: [ auth, updateScoreTestType ],
    },
    {
      method: METHOD.PUT,
      route: "/api/v1/personality/mbti/:id",
      handler: [ auth, updateMbtiTestType ],
    },  
    {
      method: METHOD.PUT,
      route: "/api/v1/personality/true-or-false/:id",
      handler: [ auth, updateTrueOrFalseTestType],
    },  
    {
      method: METHOD.DELETE,
      route: "/api/v1/personality/score/:id",
      handler: [ auth, deleteScoreTypeTest],
    },
    {
      method: METHOD.DELETE,
      route: "/api/v1/personality/mbti/:id",
      handler: [ auth, deleteMbtiTypeTest],
    },
    {
      method: METHOD.DELETE,
      route: "/api/v1/personality/true-or-false/:id",
      handler: [ auth, deleteTrueOrFalseTypeTest],
    },

    {
      method: METHOD.POST,
      route: "/api/v1/personality/score",
      handler: [ auth, setScoreTypeTest ],
    },
    {
      method: METHOD.POST,
      route: "/api/v1/personality/mbti",
      handler: [ auth, setMbtiTypeTest ],
    },

    {
      method: METHOD.POST,
      route: "/api/v1/personality/true-or-false",
      handler: [ auth, setTrueOrFalseTypeTest],
    },

    {
      method: METHOD.GET,
      route: "/api/v1/personality",
      handler: getPersonality,
    },
    {
      method: METHOD.GET,
      route: "/api/v1/personality/:id",
      handler: [checkPublic, getPersonalityItem],
    },
    {
      method: METHOD.GET,
      route: "/api/v1/personality/:id/:testType/results/:result",
      handler: getPersonalityTestResult,
    },
];

export default personalityRoute;
