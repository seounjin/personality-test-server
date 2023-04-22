import { CustomRoute, METHOD } from "../types";
import {
  getPersonality,
  getPersonalityItem,
  getPersonalityTestResult,
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
  getAccessToken,
  deleteThumbnailImage,
  deleteScoreResultImage,
} from "../controllers/personality.controller";
import auth from "../middleware/auth";
import checkPublic from "../middleware/checkPublic";
import checkDetailPersonality from "../middleware/checkDetailPersonality";
import checkAccessToken from "../middleware/checkAccessToken";
import { deleteImage, imageUploader } from "../middleware/imageUploader";


const personalityRoute: CustomRoute[] = [
    {
      method: METHOD.GET,
      route: "/api/v1/personality/private/:id",
      handler: [ checkAccessToken, getPersonalityItem],
    },

    {
      method: METHOD.GET,
      route: "/api/v1/personality/:type/:id",
      handler: [auth, checkDetailPersonality, getDetailPersonalityItems]
    },
    {
      method: METHOD.PUT,
      route: "/api/v1/personality/score/:id",
      handler: [ auth, imageUploader.array('image'), updateScoreTestType ],
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
      method: METHOD.DELETE,
      route: "/api/v1/personality/:id/thumbnail",
      handler: [auth, deleteImage, deleteThumbnailImage],
    },

    {
      method: METHOD.DELETE,
      route: "/api/v1/personality/:id/score-result-image",
      handler: [auth, deleteImage, deleteScoreResultImage],
    },

    {
      method: METHOD.POST,
      route: "/api/v1/personality/score",
      handler: [ auth, imageUploader.array('image'), setScoreTypeTest ],
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
    {
      method: METHOD.GET,
      route: "/api/v1/propensity/:id/access-token",
      handler: getAccessToken,
    },
];

export default personalityRoute;
