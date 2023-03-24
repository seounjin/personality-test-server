import express from "express";
import { initMongoDb } from "./config/connectDB";
import personalityRoute from "./routes/personality";
import userRoute from "./routes/user";
import authRoute from "./routes/auth";
import { CustomRoute } from "./types";
import dotenv from "dotenv";
dotenv.config();

process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';

const PORT = process.env.NODE_ENV === 'development' ? process.env.DEV_PORT : process.env.PROD_PORT
const CORS_ORIGIN = process.env.NODE_ENV === 'development' ? process.env.LOCAL_CORS_ORIGIN : process.env.PROD_CORS_ORIGIN

const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

initMongoDb();
app.use(cookieParser());
app.use(express.urlencoded({ limit:"3mb", extended: true }));
app.use(express.json({limit:"3mb"}));


app.use(
  cors({origin: CORS_ORIGIN,
  credentials: true
})
);


app.use("/static", express.static(__dirname + "/public"));

const routes: CustomRoute[] = [...personalityRoute, ...userRoute, ...authRoute];

routes.forEach(({ method, route, handler }) => {
  app[method](route, handler);
});

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}...`);
});
