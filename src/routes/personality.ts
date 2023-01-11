import { CustomRoute, METHOD } from "../types";
import {
  setPersonality,
  getPersonality,
  getPersonalityItem,
  getPersonalityTestResult,
} from "../controllers/personality.controller";

const personalityRoute: CustomRoute[] = [
  {
    method: METHOD.POST,
    route: "/api/v1/personality",
    handler: setPersonality,
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
];

export default personalityRoute;
