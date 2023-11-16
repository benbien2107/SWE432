// searchRouter.js
const express = require("express");
const router = express.Router();
const Song = require("../models/song");
const SongList = require("../models/songList");

router.get("/", async function (req, res) {
  const initialSongs = await Song.find().limit(5);
  const initialSongLists = await SongList.find().limit(5);
  res.render("pages/search", {
    page_name: "search",
    message: null,
    songResults: initialSongs,
    songListResults: initialSongLists,
  });
});


router.post("/", async (req, res) => {
  const query = req.body.search;
  let message = null;
  try {
    // Use a regular expression for a case-insensitive search
    const regex = new RegExp(query, "i");

    // Search in both Song and SongList for matching names
    const songResults = await Song.find({ name: regex });
    const songListResults = await SongList.find({ name: regex });

    if (songResults.length === 0 && songListResults.length === 0) {
      message = "No results found";
    } else {
      // Render the search results page with the found songs and song lists
      res.render("pages/search", {
        page_name: "search",
        message: null,
        songResults: songResults,
        songListResults: songListResults,
      });
      return;
    }
  } catch (error) {
    console.error(error);
    message = "An error occurred during the search";
  }

  res.render("pages/search", {
    page_name: "search",
    message: message,
    songResults: null,
    songListResults: null,
  });
});

module.exports = router;
