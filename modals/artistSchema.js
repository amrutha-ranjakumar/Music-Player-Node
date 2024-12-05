const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
    {
        artistname: {
            type: String,
            required: true,
        },
        artistimage: {
            type: String,
            required: true,
        },
        audio: {
            type: String,
            required: true,
        },
        songimage: {
            type: String,
            required: true,
        },
        songname: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ['malayalam', 'tamil', 'hindi', 'english','telugu'],
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    
);

module.exports = mongoose.model("artists", artistSchema);
