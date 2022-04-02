const {Router} = require('express');
const stateService = require('$/services/state');
const router = Router();

router.get('/',async (req, res, next) => {
    data = await stateService.seatData(req.user);
    if(data instanceof Error) return next(data);
    res.status(200).json({result : true , data : data});
});

router.get('/test', async (req, res, next) => {
    res.status(400).json({yoon: 'hi'});
});

router.use((err,req,res,next)=>{
    res.status(500).json({result: false, message : err.message})
})

module.exports = router;