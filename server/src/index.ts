import express from "express";
import { initMongoDb } from "./config/connectDB";
import cardsRoute from "./routes/cards";
import personalityRoute from "./routes/personality";
import { CustomRoute } from "./types";
import dotenv from "dotenv";
dotenv.config();

process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';

const PORT = process.env.NODE_ENV === 'development' ? process.env.DEV_PORT : process.env.PROD_PORT
const CORS_ORIGIN = process.env.CORS_ORIGIN;

const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

initMongoDb();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);


app.use("/static", express.static(__dirname + "/public"));

const routes: CustomRoute[] = [...cardsRoute, ...personalityRoute];

routes.forEach(({ method, route, handler }) => {
  app[method](route, handler);
});

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}...`);
});
