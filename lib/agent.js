const nodemailer = require('nodemailer');

module.exports = class Agent {

	constructor(opts) {
		this.type = opts.type || 'OAuth2';
	    this.user = opts.user || '';
		this.pass = opts.user || '';
		this.clientId = opts.clientId || '';
		this.clientSecret = opts.clientSecret || '';
		this.refreshToken = opts.refreshToken || '';
	    this.accessToken = opts.accessToken || '';
	}

    sendMail(transporter) {
        if (!transporter)
            return

        transporter.sendMail(msg, (error, info) => {
            if (error)
                return console.log(error);

            console.log('Message %s sent: %s', info.messageId, info.response)
        })
	}

	sendMailWithTokens(msg) {
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

		this.sendMail(transporter)
	}

	sendMailWithPass(msg) {
		let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: this.user,
				pass: this.pass
            }
        })

		this.sendMail(transporter)
	}
};
