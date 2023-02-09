import { userLogin, userSignup } from "../controllers/user.controller";
import { CustomRoute, METHOD } from "../types";


const userRoute: CustomRoute[] = [
    {
      method: METHOD.POST,
      route: "/api/v1/user/signup",
      handler: userSignup,
    },

    {
      method: METHOD.POST,
      route: "/api/v1/user/login",
      handler: userLogin,
    },

  ];
  
  export default userRoute;