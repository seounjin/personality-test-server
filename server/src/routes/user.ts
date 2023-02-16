import { userLogin, userLogout, userSignup } from "../controllers/user.controller";
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

    {
      method: METHOD.GET,
      route: "/api/v1/user/logout",
      handler: userLogout,
    },
];

export default userRoute;