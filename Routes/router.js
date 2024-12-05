const express = require("express");
const userController = require('../Controllers/userController');
const adminController = require("../Controllers/adminController");
const artistController = require('../Controllers/artistController');
const jwtMiddleware = require('../middlewares/jwtmiddleware');
const multerConfig = require('../middlewares/multtermiddleware');
const songsController = require('../Controllers/songsController');

const router = express.Router();

// User registration and login
router.post('/user/register', userController.register);
router.post('/user/login', userController.login);

// Admin routes
router.post("/add-music", jwtMiddleware, multerConfig.any(), adminController.addAdmin);
router.get("/oldsongs", adminController.getOldSongs);
router.get("/newsongs", adminController.getNewSongs);
router.get("/admins", adminController.getAlladmin);

// Artist routes
router.post("/add-artist", jwtMiddleware, multerConfig.any(), artistController.addArtist);

router.get("/malayalam", artistController.getmalayalam);
router.get("/tamil", artistController.gettamil);
router.get("/hindi", artistController.gethindi);
router.get("/english", artistController.getenglish);
router.get("/telugu", artistController.gettelugu);
router.get("/kannada", artistController.getkannada);
router.get('/artists', artistController.getAllArtists);

// songs routes
router.post("/add-songs", jwtMiddleware, multerConfig.any(),songsController.addsongs);
router.get('/songs', songsController.getallsongs);
//6)get user project
router.get('/project/user-ptoject', jwtMiddleware,songsController.getuserproject)

//8)delete user project
router.delete('/project/remove/:id',jwtMiddleware,songsController.deleteUserProject)

//7)edit user project
router.put('/projects/edit/:id',jwtMiddleware, multerConfig.any(),songsController.editUserProject)


module.exports = router;
