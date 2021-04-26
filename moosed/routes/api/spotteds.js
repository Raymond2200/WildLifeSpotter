const express = require('express');
const router = express.Router();
const spottedCtrl = require('../../controllers/spotteds');

//filter routes
router.get('/archived', spottedCtrl.archivedSpots)
router.get('/recentspots', spottedCtrl.recentSpots)

//Require Authentication
router.use(require('../../config/auth'));

//filter route
router.get('/myspots', spottedCtrl.mySpots)
router.get('/me/:lng/:lat', spottedCtrl.nearMeSpots)

//New spot route
router.post('/new', spottedCtrl.create);

module.exports = router;