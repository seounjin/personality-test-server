import { issueRefreshToken, userAuth } from "../controllers/auth.controller";
import { CustomRoute, METHOD } from "../types";


const authRoute: CustomRoute[] = [
    {
      method: METHOD.GET,
      route: "/api/v1/auth",
      handler: userAuth,
    },
    {
      method: METHOD.GET,
      route: "/api/v1/auth/refresh-token",
      handler: issueRefreshToken,
    },
  ];
  
  export default authRoute;