const nodemailer = require('nodemailer');

module.exports = class Agent {

	constructor(opts) {
		this.type = opts.type || 'OAuth2';
	    this.user = opts.user || '';
		this.pass = opts.pass || '';
		this.clientId = opts.clientId || '';
		this.clientSecret = opts.clientSecret || '';
		this.refreshToken = opts.refreshToken || '';
	    this.accessToken = opts.accessToken || '';
	}

    sendMail(msg, transporter) {
        if (!transporter)
            return

        transporter.sendMail(msg, (error, info) => {
            if (error)
                return console.log(error);

            console.log('Message %s sent: %s', info.messageId, info.response)
        })
	}

	sendMailWithTokens(msg) {
		if (!msg)
			return 'miss msg'

		let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                type: 'OAuth2',
                user: this.user,
    			clientId: this.clientId,
    			clientSecret: this.clientSecret,
    			refreshToken: this.refreshToken,
                accessToken: this.accessToken
            }
        })

		this.sendMail(msg, transporter)
	}

	sendMailWithPass(msg) {
		if (!msg)
			return 'miss msg'

		let transporter = nodemailer.createTransport({
			service: 'Gmail',
		    auth: {
		        user: this.user,
		        pass: this.pass
		    }
        })

		this.sendMail(msg, transporter)
	}
};
