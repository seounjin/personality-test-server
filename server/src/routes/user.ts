import { userLogin, userLogout, userSignout, userSignup } from "../controllers/user.controller";
import auth from "../middleware/auth";
import comparePassword from "../middleware/comparePassword";
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
    {
      method: METHOD.POST,
      route: "/api/v1/user/signout",
      handler: [auth, comparePassword, userSignout],
    },
];

export default userRoute;