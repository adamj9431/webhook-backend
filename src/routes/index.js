const router = require('express').Router();

router.use('/api/webhook', require('./api/webhook'));

module.exports = router;