const { methods, Route } = require('@sapphire/plugin-api');

class UserRoute extends Route {
	constructor(context, options) {
		super(context, {
			...options,
			route: ''
		});
	}

	async run(_, Response) {
		return response.json({ message: 'Landing page!' });
	}
}

module.exports = {
	UserRoute
};
