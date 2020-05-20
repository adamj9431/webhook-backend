const { action_route } = require('./action')
const { numbers } = require('../../../datasources')

action_route("get_number_fact", async function(req, res, next) {

  const { number, fact_type } = req.body
  try {
    const result = await numbers.get_trivia({ number, fact_type })
    res.status(200).json({ text: result.data })
  } catch(e) {
    next(e)
  }

});