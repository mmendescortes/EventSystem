/*
  Import the Mail utility
*/
const mail = require('nodemailer');

/*
  Export the Time utility
*/
export class Mail {
  mail : any;
  constructor(host : string, port : number, secure : boolean, requireTLS : boolean, user : string, pass : string, ciphers : string) {
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
  sendMessage(from : string, to : string, subject : string, html : string, callback : Function) : Function {
    return this.mail.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: html
    }, callback);
  }
}