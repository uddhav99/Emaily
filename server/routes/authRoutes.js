const passport = require('passport');

module.exports = (app) => {
    app.get(
        '/auth/google', 
        passport.authenticate('google', 
            {scope: ['profile', 'email'] 
        }) 
    ); // this route handler tries and gets the code 
    
    app.get('/auth/google/callback', passport.authenticate('google')); // this route handler works after the code is gotten

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    })

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })
}


