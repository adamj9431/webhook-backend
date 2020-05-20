const router = require('express').Router()

function action_route(actionName, routeHandler) {
  router.post("/",  async function (req, res, next) {
    if (req.body.action == actionName) {
      try {
        await routeHandler(req, res, next);
      } catch(err) {
        console.error(`Error when handling webhook with action "${req.body.action}"`)
        next(err);
      }
      
    } else {
      next();
    }
  })
  console.log(`Initialized route handler for webhook action "${actionName}"`)
}


module.exports = { action_route, router };