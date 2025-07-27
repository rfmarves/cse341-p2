const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/events', require('./events'));
router.use('/tickets', require('./tickets'));
router.use('/login', passport.authenticate('github', (req, res) => {}));
router.use('/logout', function(req, res, next) {
    req.logout( function(err) {
        if (err) { return next(err); }
        // req.session.user = undefined;
        res.redirect('/');
    })
})

module.exports = router;
