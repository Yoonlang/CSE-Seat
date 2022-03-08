const {Router} = require('express');
const infoService = require('$/services/info');
const router = Router();

router.get('/',async (req, res, next) => {
    data = await infoService.getUserInfo({user_sid: req.user});
    if(data instanceof Error) return next(data);
    res.status(200).json({result : true , data : data});
});

router.use((err,req,res,next)=>{
    res.status(500).json({result: false, message : err.message})
})

module.exports = router;