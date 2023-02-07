import { userSignup } from "../controllers/user.controller";
import { CustomRoute, METHOD } from "../types";


const userRoute: CustomRoute[] = [
    {
      method: METHOD.POST,
      route: "/api/v1/user/signup",
      handler: userSignup,
    },
  ];
  
  export default userRoute;