const mongoose = require("mongoose");

const songsSchema = new mongoose.Schema(
    {
        audio: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        songname: {
            type: String,
            required: true,
        },
        artistname: {
            type: String,
            required: true,
        },
      
        userId:{
            type:String,
            require:true
         }
    },
    
);

module.exports = mongoose.model("songs", songsSchema);
