const mongoose = require("mongoose");

const adSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
      required: [true, "Please add some text"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    price: {
      type: String,
      required: [true, "Please add a price"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ad", adSchema);
//
