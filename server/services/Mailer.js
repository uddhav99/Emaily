const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

// mainly using sendGrid documentation
class Mailer extends helper.Mail { // Mail - spits out a mailer class to send emails
    constructor({ subject, recipients }, content) { // not destructing content - it is the entire html template
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('uddhavbhagat99@gmail.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients); // array of helper object emails which have been formatted

        this.addContent(this.body);
        this.addClickTracking(); 
        this.addRecipients(); // adding the email helper objects to actual emails to send out
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addClickTracking() {
        const trackSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();

        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });

        this.addPersonalization(personalize);
    }
    // taking this object and sending it to sendgrid to actually send the email
    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
    }

}

module.exports = Mailer;