require("dotenv").config();

const express = require("express");
const http = require("http");
const session = require("express-session");
const passport = require("passport");
const api = require("./api");
const middleware = require("./middleware")

const app = express();

app.use(express.json({ limit: "15MB" }));
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static('assets'));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set("port", process.env.PORT || 3000);

passport.use(middleware.authware);

api(app);

const server = http.Server(app);
server.listen(app.get("port"));
