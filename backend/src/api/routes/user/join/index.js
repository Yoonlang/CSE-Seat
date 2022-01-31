const {Router} = require('express');
const { join } = require('$/services/user');
const router = Router();
const passport = require('passport');
const passportService = require('$/services/passport.js')

router.post('/', passport.authenticate('local-join', {
    successRedirect: '/main',
    failureRedirect: '/join',
    failureFlash: true}
))

module.exports = router;