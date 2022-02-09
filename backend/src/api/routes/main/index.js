const {Router} = require('express');
const stateService = require('$/services/state');
const router = Router();

router.get('/',async (req, res, next) => {
    data = await stateService.getData(req.user);
    if(data instanceof Error) return next(data);
    res.status(200).json({result : true , data : data});
});

router.use((err,req,res,next)=>{
    res.status(500).json({result: false, message : err.message})
})

module.exports = router;