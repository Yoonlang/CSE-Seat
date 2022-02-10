const {Router} = require('express');
const seatService = require('$/services/seat');
const router = Router();
const {isLoggedIn} = require('$/middlewares/auth');

router.get('/',async (req, res, next) => {
    res.status(200).json({result : true , data : 'hello'});
});

router.post('/apply',isLoggedIn,async (req, res, next) => {
    let seatDTO = req.body;
    seatDTO.user_sid = req.user;
    let result = await seatService.apply(seatDTO);
    if(result instanceof Error) return next(result);
    res.status(200).json({result: true});
});

router.use((err,req,res,next)=>{
    res.status(500).json({result: false, message : err.message})
})

module.exports = router;