const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const connectDB = require("./DB/connection");
const router = require("./routes/routes");
const app = express();
const passport = require("passport");
const MongoStore = require("connect-mongo");
const session = require("express-session");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

//using the static folder
app.use(express.static("public"));

//middlewares
app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//configuring the session middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);
// Initialize and handle sessions using Passport
app.use(passport.initialize());
app.use(passport.session());
//setting the layouts.
app.set("view engine", "ejs");
app.set("layout", "./layouts/main");

//settign up the mongoConnect
connectDB();

//setting up the routes
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
