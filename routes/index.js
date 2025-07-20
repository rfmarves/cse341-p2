const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/events', require('./events'));
router.use('/tickets', require('./tickets'));

module.exports = router;
