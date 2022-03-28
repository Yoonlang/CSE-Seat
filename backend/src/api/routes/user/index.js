const {Router} = require('express')
const join = require('./join')
const login = require('./login')
const logout = require('./logout')
const mail = require('./mail');
const router = Router();

router.use('/join', join);
router.use('/login', login);
router.use('/logout', logout);
router.use('/mail', mail);


module.exports = router;