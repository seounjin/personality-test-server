import express from "express";
import { initMongoDb } from "./config/connectDB";
import cardsRoute from "./routes/cards";
import personalityRoute from "./routes/personality";
import { CustomRoute } from "./types";

const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");

const cookieParser = require("cookie-parser");

initMongoDb();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    httpOnly: true, //자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
    secret: "secret key", //암호화하는 데 쓰일 키
    resave: false, //세션을 언제나 저장할지 설정함
    saveUninitialized: false,
    cookie: {
      //세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
      httpOnly: true,
      Secure: true,
    },
  })
);

app.use("/static", express.static(__dirname + "/public"));

const routes: CustomRoute[] = [...cardsRoute, ...personalityRoute];

routes.forEach(({ method, route, handler }) => {
  app[method](route, handler);
});

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(8000, () => {
  console.log("server listening on 8000...");
});
