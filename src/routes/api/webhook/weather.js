const router = require('express').Router()
const { handle_action } = require('../../../utils')
const { twc } = require('../../../datasources')

router.post('/', handle_action('weather.current_conditions', async function(req, res, next) {

  const { postalCode, countryCode = 'US' } = req.body
  try {
    const result = await twc.current_conditions({ postalCode, countryCode })
    res.status(200).json(result)
  } catch(e) {
    next(e)
  }

}))

router.post('/', handle_action("weather.forecast", async function(req, res, next) {

    const { postalCode, countryCode = 'US' } = req.body
    try {
      const result = await twc.forecast({ postalCode, countryCode })
      res.status(200).json(result)
    } catch(e) {
      next(e)
    }
  
}));

module.exports = router