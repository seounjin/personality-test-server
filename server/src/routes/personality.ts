import { CustomRoute, METHOD } from "../types";
import {
  setPersonality,
  getPersonality,
  getPersonalityItem,
  getPersonalityTestResult,
  getMyPersonalityTest,
  deletePersonalityTest,
} from "../controllers/personality.controller";
import auth from "../middleware/auth";


const personalityRoute: CustomRoute[] = [
  {
    method: METHOD.GET,
    route: "/api/v1/personality/my-personality",
    handler: [auth, getMyPersonalityTest]
  },
  {
    method: METHOD.POST,
    route: "/api/v1/personality",
    handler: [ auth, setPersonality ],
  },
  {
    method: METHOD.GET,
    route: "/api/v1/personality",
    handler: getPersonality,
  },
  {
    method: METHOD.GET,
    route: "/api/v1/personality/:id",
    handler: getPersonalityItem,
  },
  {
    method: METHOD.GET,
    route: "/api/v1/personality/:id/results/:type",
    handler: getPersonalityTestResult,
  },
  {
    method: METHOD.DELETE,
    route: "/api/v1/personality/:id",
    handler: [ auth, deletePersonalityTest],
  },
];

export default personalityRoute;
