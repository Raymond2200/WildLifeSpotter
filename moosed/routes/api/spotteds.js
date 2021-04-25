const express = require('express');
const router = express.Router();
const spottedCtrl = require('../../controllers/spotteds');


router.use(require('../../config/auth'));
router.post('/new', spottedCtrl.create);

//filter routes
router.get('/archived', spottedCtrl.archivedSpots)
router.get('/myspots', spottedCtrl.mySpots)
router.get('/recentspots', spottedCtrl.recentSpots)

module.exports = router;