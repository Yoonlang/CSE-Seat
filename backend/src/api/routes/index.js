const {Router} = require('express')
const user = require('./user')
const path = require('path');
const router = Router();

router.get('/', function(req,res){
    res.send('/');
});
router.use('/user', user);

module.exports = router;