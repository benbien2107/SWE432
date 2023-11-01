const fs = require("fs");
var express = require("express");
var path = require("path");

var app = express();
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname + "/public")));

app.get("/", function (req, res) {
  res.render("pages/home",  { page_name: 'home' });
});

app.get("/home", function (req, res) {
  res.render("pages/home", { page_name: 'home' });
});

app.get("/search", function (req, res) {
  res.render("pages/search", { page_name: 'search' });
});

app.get("/time-slot", function (req, res) {
  res.render("pages/time-slot", { page_name: 'time-slot' });
});

app.get("/playlist", function (req, res) {
  res.render("pages/playlist", { page_name: 'playlist' });
});

app.get("/calendar", function (req, res) {
  res.render("pages/calendar", { page_name: 'calendar' });
});

app.listen(8080);
console.log("Server is listening on port 8080");
