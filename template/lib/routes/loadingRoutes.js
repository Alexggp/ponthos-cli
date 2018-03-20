/* list of all routes */
var pingRoute = require('./mobile/ping');
function register(app)
{
	pingRoute.registerRoutes(app);
	// add your routes here ,,,,
}
module.exports.register = register;