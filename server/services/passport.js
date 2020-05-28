const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser( (user, done) => {
    done(null, user.id); // not the profile id - this is the id assigned to user by mongo
});

passport.deserializeUser( (id, done) => {
    User.findById(id)
        .then(user => { // user refers to what we take out of the database 
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy( {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret, 
    callbackURL: '/auth/google/callback',
    proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id })
            .then(existingUser => {
                if (existingUser) {
                    // we already have the record with the given profile id
                    done(null, existingUser);
                } else {
                    // we need to create one
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            });
    })
);

