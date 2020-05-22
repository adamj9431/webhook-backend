module.exports.handle_action = function(actionName, handler) {
    return function(req, res, next) {
        if (req.body.action == actionName) {
            handler(req, res, next)
        } else {
            next()
        }
    }
}