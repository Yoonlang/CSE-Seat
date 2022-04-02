const {Router} = require('express');
const seatService = require('$/services/seat');
const router = Router();
const {isLoggedIn} = require('$/middlewares/auth');

router.get('/',async (req, res, next) => {
    res.status(200).json({result : true , data : 'hello'});
});

router.post('/application',isLoggedIn,async (req, res, next) => {
    let seatDTO = req.body;
    seatDTO.user_sid = req.user;
    let json = await seatService.apply(seatDTO); // 수정 필요
    if(json instanceof Error) return next(json);
    res.status(200).json(json);
});
router.post('/reservation',isLoggedIn,async (req, res, next) => {
    let seatDTO = req.body;
    seatDTO.user_sid = req.user;
    let result = await seatService.reserve(seatDTO);
    if(result instanceof Error) return next(result);
    res.status(200).json(result);
});

router.post('/reservation-cancel',isLoggedIn,async (req, res, next) => {
    let seatDTO = req.body;
    seatDTO.user_sid = req.user;
    let result = await seatService.cancelReservation(seatDTO);
    if(result instanceof Error) return next(result);
    res.status(200).json(result);
});

router.use((err,req,res,next)=>{
    console.log(err);
    res.status(500).json({result: false, message : err.message})
})

module.exports = router;