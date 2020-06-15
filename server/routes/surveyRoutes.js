const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');

// middleware
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

// db
const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');

// sendGrid stuff
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = app => {

    app.get('/api/surveys/:surveys/:choice', (req, res) => {
        res.send('Thanks for your response');
    })

    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false });

        res.send(surveys);
    });

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

        _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return { email: email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email: email, responded: false}
                    }
                }, {
                    $inc: { [choice]: 1},
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec();
            })
            .value();

        // this chain 
        // 1. map -> maps all the events and then basically extracts the needed parts of the whole req.body (path parser, lodash, url specific)
        // 2. compact -> Creates an array with all falsey values removed. The values false, null, 0, "", undefined, and NaN are falsey.
        // 3. uniqby -> gets the unique value only (incase user clicks twice)
        // 4. each -> iterates through the events and updates the database accordingly. First, we find a matching record
        // then we update the model using $inc and $set. exec just executes it
        // 5. value -> gives us the updated value

        // _id -> because mongoose specific ID

        res.send({});  // to avoid duplicate and make sure sendgrid thinks everything ok
    });
};