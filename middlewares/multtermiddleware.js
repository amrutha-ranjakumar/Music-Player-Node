const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        const filename = `file-${Date.now()}-${file.originalname}`;
        callback(null, filename);
    },
});

const fileFilter = (req, file, callback) => {
    const allowedExtensions = [".png", ".jpeg", ".jpg", ".mp3", ".m4a", ".mp4", ".flac"];
    const fileExtension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(fileExtension)) {
        callback(null, true);
    } else {
        callback(null, false);
        return callback(new Error("Only PNG, JPEG, JPG, MP3, M4A, MP4, and FLAC files are allowed."));
    }
};

const multerConfig = multer({ storage, fileFilter });

module.exports = multerConfig;
