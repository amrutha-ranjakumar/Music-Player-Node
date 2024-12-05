const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    songname: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    audio: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['oldsong', 'newsong'], // Enforce that the category must be either "oldsong" or "newsong"
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming the user is referenced by an ObjectId
      required: true,
    },
  },
 
);

module.exports = mongoose.model("Admin", adminSchema);
