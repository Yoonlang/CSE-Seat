const {Router} = require('express')
const router = Router();

router.get('/',(req, res) => {
});
router.use('/join', join);
router.use('/login', login);


module.exports = router;