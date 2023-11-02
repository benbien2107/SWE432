const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/public")));

app.get("/", function (req, res) {
  res.render("pages/home", { page_name: "home" });
});

app.get("/home", function (req, res) {
  res.render("pages/home", { page_name: "home" });
});

app.get("/search", function (req, res) {
  res.render("pages/search", { page_name: "search" , message : null});
});

app.post("/search", (req, res) => {
  var name = req.body.search;
  let message = null; // Initialize the message variable.
  if (name.trim() === "") {
    message = "Search cannot be empty";
  } else {
    // Process the search or perform other actions.
    console.log(name);
  }
  res.render("pages/search", { page_name: "search", message: message });
});

app.get("/time-slot", function (req, res) {
  res.render("pages/time-slot", { page_name: "time-slot" });
});

app.get("/playlist", function (req, res) {
  res.render("pages/playlist", { page_name: "playlist" });
});

app.get("/calendar", function (req, res) {
  res.render("pages/calendar", { page_name: "calendar" });
});

app.listen(8080);
console.log("Server is listening on port 8080");
