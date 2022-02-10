const {Router} = require('express')
const user = require('./user')
const main = require('./main')
const seat = require('./seat')
const path = require('path');
const router = Router();

router.use('/seat', seat);
router.use('/user', user);
router.use(main);

module.exports = router;