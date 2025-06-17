const express = require("express");
const router = express.Router();
let watchlist=require("../controllers/watchlistController");
router.get("/page", watchlist.watchlistPage);


router.post("/addWatchlist",watchlist.insertToWatchList);
module.exports=router;
