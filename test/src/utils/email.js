const nodemailer = require('nodemailer');
const path = require('path');

function setupMail() {
	return nodemailer.createTransport({
		auth: {
			pass: process.env.OUTLOOK_PASSWORD,
			user: process.env.OUTLOOK_MAIL,
		},
		host: 'smtp-mail.outlook.com', // hostname
		port: 587, // port for secure SMTP
		secureConnection: false, // TLS requires secureConnection to be false
		tls: {
			ciphers: 'SSLv3',
		},
	});
}

async function sendNewUserMail(name, email, token) {
	let message = {
		attachments: [
			{
				cid: 'authorization_img',
				contentDisposition: 'inline',
				filename: 'email-authorization.jpg',
				path: path.join(__dirname, '/../images/email-authorization.jpg'),
			},
		],
		from: process.env.OUTLOOK_MAIL,
		// server from which is mail sent
		html: `
		<table align="center"  cellpadding="0" cellspacing="0" width="600">
			<tr>
				<td align="center" bgcolor="#70bbd9" style="padding: 40px 0 30px 0;">
					<img src="cid:authorization_img" alt="Creating New User" height="300" style="display: block;" />
				</td>
			</tr>
			<tr>
				<td bgcolor="#ffffff" style="padding: 10px">
					Authorization needed for user: ${name} (email: ${email}).
				</td>
				<td bgcolor="#ffffff" style="padding: 10px">
					This confirmation is valid for 1 hour
				</td>
			</tr>
			<tr>
				<td bgcolor="#ffffff" style="padding: 10px">
					<a href="${process.env.CLIENT_URL}/login?token=${token}">Confirm email</a>
				</td>
			</tr>
		</table>
		`,
		subject: 'Creating new user',
		to: email,
	};

	let transport = setupMail();

	try {
		const response = await transport.sendMail(message);

		return Promise.resolve(response);
	} catch (error) {
		return Promise.reject({
			errorType: 'email',
			message: 'There was a problem with sending email to admin, please try to sign up little later',
		});
	}
}

module.exports = {
	sendNewUserMail,
};
