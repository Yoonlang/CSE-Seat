const {Router} = require('express');
const user = require('./user');
const main = require('./main');
const seat = require('./seat');
const entry = require('./entry');
const history = require('./history');
const info = require('./info');
const router = Router();

router.use('/seat', seat);
router.use('/user', user);
router.use('/entry', entry);
router.use('/history', history);
router.use('/info', info);
router.use(main);

module.exports = router;