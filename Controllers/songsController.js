const { request } = require("express");
const songs = require("../modals/songsSchema");


exports.addsongs = async (req, res) => {
    console.log("inside add songsController");

    const userId = req.payload;
    console.log(userId);

    try {
        const { songname, artistname  } = req.body;

        // Extracting filenames for image and audio from the uploaded files
        const image = req.files.find(file => file.fieldname === 'image').filename;
        const audioFile = req.files.find(file => file.fieldname === 'audio').filename;
       

        const existingAdmin = await songs.findOne({ audio: audioFile });
        if (existingAdmin) {
            res.status(406).json("Music already exists. Please upload a new one.");
        } else {
            const newMusic = new songs({
                image: image,
                audio: audioFile,
                songname:songname,
                artistname:artistname,
                userId: userId
            });
            await newMusic.save();
            res.status(200).json("Music added successfully.");
        }
    } catch (err) {
        res.status(401).json("Unable to add music due to: " + err);
    }
};




exports.getallsongs = async (req, res) => {
    const userId = req.payload
    try {
        const usersongs = await songs.find();
        res.status(200).json(usersongs)

    } catch (err) {
        res.status(401).json("request failed due to ", err)
    }
}


exports.getuserproject = async (req, res) => {
    const userId = req.payload
    try {
        const userproject = await songs.find({ userId: userId });
        res.status(200).json(userproject)

    } catch (err) {
        res.status(401).json("request failed due to ", err)
    }
}


exports.deleteUserProject = async (req, res) => {
    const {id} = req.params
    try {
        const removeProject = await songs.findByIdAndDelete({ _id: id })
        res.status(200).json("project deleted successfully")
    }catch (err){
        res.status(401).json("delete failed",err)
    }
}




exports.editUserProject = async(req,res)=>{

    const {id} = req.params;
    const userId = req.payload;
     console.log("project id",id);
     console.log("user id",userId);
        const { audio, image,songname, artistname } = req.body;
        const uploadProjectImage = req.file ? req.file.filename : image;
        try {
            const upddateProject = await songs.findByIdAndUpdate({ _id: id },
                {
    
                    audio: audio,
                    image: image,
                    songname: songname,
                    artistname: artistname,
                    userId: userId
                },
                { new: true }
            )
            await upddateProject.save()
            res.status(200).json("project updated successfully")
        } catch (err) {
            res.status(401).jason("unable to update due to:", err)
        }
    
    }