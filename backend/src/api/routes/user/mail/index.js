const {Router} = require('express');
const router = Router();
const flash = require('connect-flash');
const userService = require('$/services/user');

router.get('/', (req, res)=>{
    res.send({result : 'hi', sid :  req.user, address: appDir});
});

router.post('/', async(req, res, next) => {
    result = await userService.mail(req.body.mail);
    if(result instanceof Error) return next(result);
    if(result.result === false) return next(result);
    res.status(200).json(result);
});

router.use((err,req,res,next)=>{
    res.status(400).json({result: false, message : err.message})
})

module.exports = router;