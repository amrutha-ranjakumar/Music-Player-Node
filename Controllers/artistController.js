const artists = require("../modals/artistSchema");




exports.addArtist = async (req, res) => {
    console.log("Inside addArtist controller");

    try {
        const { artistname, songname, category } = req.body;
        const userId = req.payload; // Retrieved from jwtMiddleware

        // Check if files are provided
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "Files are required: artistimage, songimage, and audio." });
        }

        // Extract files
        let artistimage, songimage, audio;
        req.files.forEach((file) => {
            if (file.fieldname === "artistimage" && file.mimetype.startsWith("image")) {
                artistimage = file.filename;
            } else if (file.fieldname === "songimage" && file.mimetype.startsWith("image")) {
                songimage = file.filename;
            } else if (file.fieldname === "audio" && (file.mimetype.startsWith("audio") || file.mimetype === "video/mp4")) {
                audio = file.filename;
            }
        });

        // Validate file extraction
        if (!artistimage || !songimage || !audio) {
            return res.status(400).json({
                error: "Files are required: artistimage, songimage, and audio.",
            });
        }

        // Validate category
        if (!["malayalam", "tamil", "hindi", "english","telugu"].includes(category)) {
            return res.status(400).json({
                error: "Invalid category. Must be one of 'malayalam', 'tamil', 'hindi', or 'english'.",
            });
        }

        // Create artist object
        const newArtist = new artists({
            artistname,
            artistimage,
            songimage,
            audio,
            songname,
            category,
            userId,
        });

        await newArtist.save();
        res.status(200).json({ message: "Artist and music added successfully.", data: newArtist });
    } catch (err) {
        console.error("Error in addArtist:", err);
        res.status(500).json({ error: "Unable to add music. " + err.message });
    }
};


exports.getmalayalam = async (req, res) => {
    try {
        const malayalam = await artists.find({ category: "malayalam" }); // Filter by category
        res.status(200).json(malayalam);
    } catch (err) {
        res.status(500).json("Unable to fetch old songs due to: " + err.message);
    }
};



exports.gettamil = async (req, res) => {
    try {
        const tamil = await artists.find({ category: "tamil" }); // Filter by category
        res.status(200).json(tamil);
    } catch (err) {
        res.status(500).json("Unable to fetch old songs due to: " + err.message);
    }
};


exports.gethindi = async (req, res) => {
    try {
        const hindi = await artists.find({ category: "hindi" }); // Filter by category
        res.status(200).json(hindi);
    } catch (err) {
        res.status(500).json("Unable to fetch old songs due to: " + err.message);
    }
};


exports.getenglish = async (req, res) => {
    try {
        const english = await artists.find({ category: "english" }); // Filter by category
        res.status(200).json(english);
    } catch (err) {
        res.status(500).json("Unable to fetch old songs due to: " + err.message);
    }
};



exports.gettelugu = async (req, res) => {
    try {
        const telugu = await artists.find({ category: "telugu" }); // Filter by category
        res.status(200).json(telugu);
    } catch (err) {
        res.status(500).json("Unable to fetch old songs due to: " + err.message);
    }
};


exports.getkannada = async (req, res) => {
    try {
        const kannada = await artists.find({ category: "kannada" }); // Filter by category
        res.status(200).json(kannada);
    } catch (err) {
        res.status(500).json("Unable to fetch old songs due to: " + err.message);
    }
};



// Controller for fetching a few artists, limiting to one song per artist
exports.getAllArtists = async (req, res) => {
    try {
        const allArtists = await artists.aggregate([
            { $group: { _id: "$artistname", song: { $first: "$$ROOT" } } },
            { $replaceRoot: { newRoot: "$song" } }, // Replace with the song object
            { $limit: 5 } // Fetch only 5 artists, each with one song
        ]);
        res.status(200).json(allArtists);
    } catch (err) {
        res.status(500).json("Unable to fetch artists due to: " + err.message);
    }
};


