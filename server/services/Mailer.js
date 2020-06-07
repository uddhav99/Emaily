const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail { // Mail - spits out a mailer class to send emails

}

module.exports = Mailer;