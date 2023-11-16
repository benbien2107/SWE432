// homeRouter.js
const express = require("express");
const router = express.Router();
const Song = require("../models/song");
const SongList = require("../models/songList");


router.get("/", async function (req, res) {
  const songResults = await Song.find();
  const songListResults = await SongList.find();
  res.render("pages/home", {
    page_name: "home",
    message: null,
    songResults,
    songListResults,
  });
});

router.get("/home", async function (req, res) {
  const songResults = await Song.find();
  const songListResults = await SongList.find();
  res.render("pages/home", {
    page_name: "home",
    message: null,
    songResults,
    songListResults,
  });
});


module.exports = router;