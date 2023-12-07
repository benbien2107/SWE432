var express = require("express");
var app = express();
const path = require("path");

const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const bodyParser = require("body-parser"); // Import body-parser
const Student = require("./models/student");
mongoose.connect("mongodb://localhost:27017");
app.use(express.static(path.join(__dirname + "/public")));


const db = mongoose.connection;
db.once("open", () => {
  console.log("connected to mongo");
});

app.use(
  session({
    secret: "MySecretCode",
    saveUninitialized: true,
    resave: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017",
      autoRemove: "interval",
      autoRemoveInterval: 10, // In minutes. Default
    }),
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
// set the view engine to ejs
app.set("view engine", "ejs");

// the first page should be student
app.get("/", function (req, res) {
  res.render("pages/student");
});

//student page again
app.get("/student", async function (req, res) {
  res.render("pages/student");
});

app.post("/student", async function (req, res) {
  const name_query = req.body.name;
  const gnumber_query = req.body.gnumber;
  const email_query = req.body.email;

  if (!name_query || !gnumber_query || !email_query) {
    return res.status(400).send("Name, gnumber, and email are required");
  }

  req.session.name = name_query;
  req.session.gnumber = gnumber_query;
  req.session.email = email_query;

  await Student.create({
    name: name_query,
    gnumber: gnumber_query,
    email: email_query,
  });
  res.redirect("contact");
});

app.get("/contact", async function (req, res) {
  res.render("pages/contact.ejs", {
    name: req.session.name,
    gnumber: req.session.gnumber,
    email: req.session.email,
  });
});

app.post("/contact", async function (req, res) {
  const personName = req.session.name;
  const message = req.body.message || "No message provided";

  const student = await Student.findOneAndUpdate(
    { name: personName },
    { message: message },
    { new: true } // Return the updated document
  );

  if (!student) {
    // If the student is not found, you might want to handle it accordingly
    console.error(`Student with name ${personName} not found`);
    return res.status(404).send("Student not found");
  }
  // Redirect to the student page
  res.redirect("/student");
});
app.listen(8080);
console.log("Server is listening on port 8080");
