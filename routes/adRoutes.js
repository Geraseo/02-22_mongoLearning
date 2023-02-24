const express = require("express");
const router = express.Router();

const {
  setAd,
  getAds,
  updateAd,
  deleteAd,
  getAllAds,
} = require("../controllers/adController");
const { protectAdmin } = require("../middleware/adminAuthMiddleware");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getAds).post(protect, setAd);
router.route("/:id").put(protect, updateAd).delete(protect, deleteAd);
router.route("/all").get(getAllAds);
module.exports = router;
