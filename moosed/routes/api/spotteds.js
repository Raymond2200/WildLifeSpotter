const express = require('express');
const router = express.Router();
const spotttedCtrl = require('../../controllers/spotteds');


router.use(require('../../config/auth'));
router.post('/new', spotttedCtrl.create);

module.exports = router;