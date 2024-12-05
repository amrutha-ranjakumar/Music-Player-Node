const admins = require("../modals/adminSchema");

exports.addAdmin = async (req, res) => {
    console.log("Inside addAdmin controller");

    const userId = req.payload;
    try {
        const { songname, category } = req.body; // Include category in the request body

        // Extracting filenames for image and audio from the uploaded files
        const image = req.files.find(file => file.fieldname === 'image').filename;
        const audioFile = req.files.find(file => file.fieldname === 'audio').filename;

        // Check if category is valid
        if (!["oldsong", "newsong"].includes(category)) {
            return res.status(400).json("Invalid category. Must be 'oldsong' or 'newsong'.");
        }

        const newMusic = new admins({
            songname,
            image,
            audio: audioFile,
            category, // Save the category
            userId,
        });

        await newMusic.save();
        res.status(200).json("Music added successfully.");
    } catch (err) {
        res.status(500).json("Unable to add music due to: " + err.message);
    }
};




exports.getOldSongs = async (req, res) => {
    
    
    try {
        const oldSongs = await admins.find({ category: "oldsong" }); // Filter by category
        res.status(200).json(oldSongs);
    } catch (err) {
        res.status(500).json("Unable to fetch old songs due to: " + err.message);
    }
};


exports.getNewSongs = async (req, res) => {
    try {
        const newSongs = await admins.find({ category: "newsong" }); // Filter by category
        res.status(200).json(newSongs);
    } catch (err) {
        res.status(500).json("Unable to fetch new songs due to: " + err.message);
    }
};

exports.getAlladmin = async (req, res) => {
  
    try {
        const allArtists = await admins.find() // Fetch all artists, limit to 6
        res.status(200).json(allArtists);
    } catch (err) {
        res.status(500).json("Unable to fetch artists due to: " + err.message);
    }
};









  


