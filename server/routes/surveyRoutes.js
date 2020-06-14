const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const mongoose = require('mongoose');

const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => {

    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for your response');
    })

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey ({
            title: title,
            subject: subject,
            body: body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id, 
            dateSent: Date.now()
        });

        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user); // so that header can see the num of credits and then update new credits 
        } catch(err) {
            res.status(422).send(err);
        }
    });

    // cleaning up the webhook response 
    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');

        const events = _.chain(req.body)
            .map((event) => {
                const match = p.test(new URL(event.url).pathname);
                if (match) {
                    return { email: event.email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .value();

        console.log(events);
        res.send({});  // to avoid duplicate and make sure sendgrid thinks everything ok
    });
};