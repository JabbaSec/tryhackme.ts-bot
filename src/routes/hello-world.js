const { methods, Route } = require('@sapphire/plugin-api');

class UserRoute extends Route {
	constructor(context, options) {
		super(context, {
			...options,
			route: 'hello-world'
		});
	}

	async run(_, Response) {
		return response.json({ message: 'Hello, world!' });
	}
}

module.exports = {
	UserRoute
};
