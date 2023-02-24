const asyncHandler = require("express-async-handler");

const Ad = require("../models/adModel");

// @desc Get ads
// @route GET /api/ads
// @access PRIVATE
const getAds = asyncHandler(async (req, res) => {
  const ads = await Ad.find({ user: req.user.id });
  res.status(200).json(ads);
});

// @desc Set ads
// @route POST /api/ads
// @access PRIVATE
const setAd = asyncHandler(async (req, res) => {
  if (!req.body.text || !req.body.description || !req.body.price) {
    res.status(400);
    throw new Error("Please add a required fields");
  }
  const ad = await Ad.create({
    text: req.body.text,
    description: req.body.description,
    price: req.body.price,
    user: req.user.id,
  });
  res.status(200).json(ad);
});

// @desc Update ad
// @route PUT /api/ads/:id
// @access PRIVATE
const updateAd = asyncHandler(async (req, res) => {
  const ad = await Ad.findById(req.params.id);

  if (!ad) {
    res.status(400);
    throw new Error("Ad not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure the logged in user matches the goal user
  if (ad.user.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(401);
    throw new Error("User not authorized");
  }

  // if admin or ad creator can edit
  if (req.user.role === "admin" || ad.user.toString() === req.user.id) {
    const updateAd = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updateAd);
    // console.log(req.user.role);
  }
});

// @desc Delete goal
// @route DELETE /api/goals/:id
// @access PRIVATE
const deleteAd = asyncHandler(async (req, res) => {
  const ad = await Ad.findById(req.params.id);

  if (!ad) {
    res.status(400);
    throw new Error("Ad not found");
  }

  // check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // make sure the logged in user matches the goal user
  if (ad.user.toString() !== req.user.id && req.user.role !== "admin") {
    res.status(401);
    throw new Error("User not authorized");
  }

  if (req.user.role === "admin" || ad.user.toString() === req.user.id) {
    await ad.remove();
    res.status(200).json({ message: "Ad removed" });
  }
});
//_______

const getAllAds = asyncHandler(async (req, res) => {
  const ads = await Ad.find({});
  res.status(200).json(ads);
});

module.exports = {
  getAds,
  setAd,
  updateAd,
  deleteAd,
  getAllAds,
};
