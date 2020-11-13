const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const movieSchema = new Schema(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    plot: { type: String, required: true },
    image: { type: String, default: "https://via.placeholder.com/300" },
    cast: [{ type: Schema.Types.ObjectId, ref: "Celebrity" }],
  },
  { timestamps: true }
);

module.exports = model("Movie", movieSchema);
