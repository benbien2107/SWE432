const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();
const Song = require("./models/song");
const SongList = require("./models/songList");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { name } = require("ejs");

mongoose.connect("mongodb://localhost:27017");

const db = mongoose.connection;

db.once("open", () => {
  console.log("connected to mongo");
});

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
  res.render("pages/search", { page_name: "search", message: null });
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

app.get("/time-slot", async function (req, res) {
  try {
    const data = await SongList.find().populate("songs").exec();

    res.render("pages/time-slot", { page_name: "time-slot", data, counter: 0 });
  } catch (error) {
    console.error(error);
    // Handle error
    res.status(500).send("Internal Server Error");
  }
});

// // Add a new route to handle dynamic content updates
// app.get("/time-slot/:counter", async function (req, res) {
//   try {
//     const counter = parseInt(req.params.counter);
//     const data = await SongList.find().populate('songs').exec();

//     // Validate the counter to prevent out-of-bounds access
//     if (counter >= 0 && counter < data.length) {
//       res.render("pages/time-slot", { page_name: "time-slot", data, counter });
//     } else {
//       // Handle an invalid counter (e.g., redirect to a default page)
//       res.redirect("pages/time-slot/");
//     }
//   } catch (error) {
//     console.error(error);
//     // Handle error
//     res.status(500).send("Internal Server Error");
//   }
// });

app.post("/time-slot", async function (req, res) {
  try {
    var counter = parseInt(req.body.counter);
    const direction = req.body.direction;

    if (direction === "left") {
      // Decrement the counter
      counter--;
    } else if (direction === "right") {
      counter++;
    }
    
   
    const data = await SongList.find().populate("songs").exec();

     // Check if the counter is within bounds
     if (counter < 0) {
      counter = 0; // Set to the first index if below 0
    } else if (counter >= data.length) {
      counter = data.length - 1; // Set to the last index if above or equal to the length
    }


    res.render("pages/time-slot", { page_name: "time-slot", data, counter });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
// // Modify the existing route to use counter 0 by default
// app.get("/time-slot", function (req, res) {
//   res.redirect("/time-slot/0");
// });

app.get("/playlist", function (req, res) {
  res.render("pages/playlist", { page_name: "playlist" });
});

app.get("/calendar", function (req, res) {
  res.render("pages/calendar", { page_name: "calendar" });
});

app.listen(8080);
console.log("Server is listening on port 8080");
