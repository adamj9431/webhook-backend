const router = require('express').Router()
const { handle_action, postal_code_cleanup } = require('../../../utils')
const { twc } = require('../../../datasources')

router.post('/', handle_action('weather.current_conditions', async function(req, res, next) {
  try {
    let { postalCode, countryCode = 'US' } = req.body
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

router.post('/', handle_action("weather.forecast", async function(req, res, next) {

    try {
      
      let { postalCode, countryCode = 'US' } = req.body
      postalCode = postal_code_cleanup(postalCode)

      const result = await twc.forecast({ postalCode, countryCode })
      res.status(200).json(result)
    } catch(e) {
      if (e.response && e.response.status == "404") {
        e.status = 404
      }
      next(e)
    }
  
}));

module.exports = router