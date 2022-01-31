const {Router} = require('express');
const { join } = require('../../../services/user');
const router = Router();
const joinController = require('./join.controller')
const passportService = require('../service/passport.js')

//router.use(joinController)
//router.get('/', joinController.index());
router.post('/', passport.authenticate('local-join', {
    successRedirect: '/main',
    failureRedirect: '/join',
    failureFlash: true}
))

module.exports = router;