const { Service } = require('engined');
const Agent = require('./lib/agent');

module.exports = (opts = {}) => class extends Service {

	constructor(context) {
		super(context);

		this.dependencies = [
			'Mailer'
		];
		this.agentName = opts.agentName;
		this.options = opts;
	}

	async start() {

		let mailerManager = this.getContext().get('Mailer');

		let agent = new Agent(this.options);

		mailerManager.register(this.agentName, agent);
	}

	async stop() {

		mailerManager.unregister(this.agentName);
	}
}
