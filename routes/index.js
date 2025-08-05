const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/books', require('./books')); // Added books routes
router.use('/contacts', require('./contacts')); // Added contacts routes

router.get('/', (req, res) => {
    res.send('Hello world');
});

router.get('/login', passport.authenticate('github'), (req, res) => { });

router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;