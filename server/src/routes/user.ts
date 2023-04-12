import { getMyPersonalityTest, getUserId, userLogin, userLogout, userSignout, userSignup } from "../controllers/user.controller";
import auth from "../middleware/auth";
import checkDuplicateLogin from "../middleware/checkDuplicateLogin";
import comparePassword from "../middleware/comparePassword";
import { CustomRoute, METHOD } from "../types";


const userRoute: CustomRoute[] = [

    {
      method: METHOD.GET,
      route: "/api/v1/users",
      handler: [auth, getUserId],
    },
    
    {
      method: METHOD.GET,
      route: "/api/v1/users/my-personality",
      handler: [auth, getMyPersonalityTest]
    },

    {
      method: METHOD.POST,
      route: "/api/v1/users/signup",
      handler: userSignup,
    },

    {
      method: METHOD.POST,
      route: "/api/v1/users/login",
      handler: [checkDuplicateLogin, userLogin],
    },

    {
      method: METHOD.GET,
      route: "/api/v1/users/logout",
      handler: userLogout,
    },
    {
      method: METHOD.POST,
      route: "/api/v1/users/signout",
      handler: [auth, comparePassword, userSignout],
    },
];

export default userRoute;