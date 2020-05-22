const router = require('express').Router();

// all webhook handlers should be on '/'
router.use('/', require('./weather'));


// this should be last, will fire if no webhook handler did
router.post('/', function(req, res, next) {
    const { action } = req.body
    const e = new Error(`Webhook action '${action}' not found!`)
    e.status = 404
    next(e)
})

module.exports = router;