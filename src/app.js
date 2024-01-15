const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
require("dotenv").config();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
const mainRouter = require("./router/mainRouter");

app.listen(process.env.PORT || 3000);

app.use(mainRouter);
