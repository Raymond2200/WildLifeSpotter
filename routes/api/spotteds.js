const express = require('express');
const router = express.Router();
const spottedCtrl = require('../../controllers/spotteds');

//filter routes
router.get('/archived/:lng/:lat', spottedCtrl.archivedSpots);
router.get('/recentspots', spottedCtrl.nearMeSpots);
router.get('/me/:lng/:lat', spottedCtrl.nearMeSpots);

//Require Authentication
router.use(require('../../config/auth'));

//filter route
router.get('/myspots', spottedCtrl.mySpots);

//New spot route
router.post('/new', spottedCtrl.create);

module.exports = router;