module.exports.handle_action = function(actionName, handler) {
    return function(req, res, next) {
        if (req.body.action == actionName) {
            handler(req, res, next)
        } else {
            next()
        }
    }
}
module.exports.postal_code_cleanup = function(postalCode) {
    // remove all whitespace
    let val = postalCode.replace(/\s/g, '')
    return val
}