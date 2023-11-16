const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const Song = require("./models/song");
const SongList = require("./models/songList");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');
const { name } = require("ejs");
const homeRouter = require("./routes/homeRouter");
const searchRouter = require("./routes/searchRouter");
const playlistRouter = require("./routes/playlistRouter");
const calendarRouter = require("./routes/calendarRouter");
const timeSlotRouter = require("./routes/timeSlotRouter");
mongoose.connect("mongodb://localhost:27017");
// Use the session middleware
app.use(
  session({
    secret: "mysecretcode",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/test",
      autoRemove: "interval",
      autoRemoveInterval: 10, // In minutes. Default
    }),
  })
);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/public")));
app.use("/", homeRouter);
app.use("/search", searchRouter);
app.use("/playlist", playlistRouter);
app.use("/calendar", calendarRouter);
app.use("/time-slot", timeSlotRouter);
const db = mongoose.connection;

db.once("open", () => {
  console.log("connected to mongo");
});

app.listen(8080);
console.log("Server is listening on port 8080");
