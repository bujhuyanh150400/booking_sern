import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";

let app = express();

//dùng dotenv để config env
require("dotenv").config();

// ------ config lỗi cors
// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// middleware dùng để config các http methods
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// config app
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb" }));
// config web engine
viewEngine(app);

// config route
initWebRoutes(app);

// tạo biến kết nối với cổng
let port = process.env.PORT || 3000;

// express sẽ chạy thông qua cổng
app.listen(port, () => {
  console.log(`Running on port ${port} successfully`);
});
