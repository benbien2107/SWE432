// playlistRouter.js
const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("pages/playlist", { page_name: "playlist" });
});

module.exports = router;