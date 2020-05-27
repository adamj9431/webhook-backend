const router = require('express').Router()
const { handle_action, postal_code_cleanup } = require('../../../utils')
const { twc } = require('../../../datasources')

router.post('/', handle_action('weather.current_conditions', async function(req, res, next) {
  try {
    let { postalCode, countryCode = 'US' } = req.body

    if (!postalCode) {
      const e = new Error('You must provide a postalCode value')
      e.status = 400
      throw e
    }

    postalCode = postal_code_cleanup(postalCode)

    const result = await twc.current_conditions({ postalCode, countryCode })
    result.url = twc.url({ postalCode }) // add the URL to the weather.com page for this location
    res.status(200).json(result)
  } catch(e) {
    if (e.response && e.response.status == "404") {
      e.status = 404
    }
    next(e)
  }

}))

module.exports = router