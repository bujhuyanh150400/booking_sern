import express from "express";
let configViewEngine = (app) => {
  // config express lấy dữ liệu file tĩnh (img,css)
  app.use(express.static("./src/public"));

  // config express set view engine là ejs
  app.set("view engine", "ejs");

  // config đường link để lấy view
  app.set("views", "./src/views");
};

export default configViewEngine;
