/*
  Import the Mail utility
*/
var mail = require('nodemailer');

/*
  Export the Time utility
*/
module.exports = class Mail {
  constructor(host, port, secure, requireTLS, user, pass, ciphers) {
    this.mail = mail.createTransport({
      host: host,
      port: port,
      secureConnection: secure,
      requireTLS: requireTLS,
      auth: {
        user: user,
        pass: pass
      },
      tls: {
        ciphers: ciphers
      }
    });
  }

  /*
    Send new message from Mail instance
  */
  sendMessage(from, to, subject, html, callback) {
    return this.mail.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: html
    }, callback);
  }
}