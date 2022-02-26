const {Router} = require('express');
const entryService = require('$/services/entry');
const router = Router();
const {isLoggedIn} = require('$/middlewares/auth');

router.get('/',async (req, res, next) => {
    res.status(200).json({result : true , data : 'hello'});
});

router.post('/check-in',isLoggedIn, async (req, res, next) => {
    let entryDTO = req.body;
    entryDTO.user_sid = req.user;
    let result = await entryService.checkIn(entryDTO);
    if(result instanceof Error) return next(result);
    res.status(200).json({result: true});
});

    if(result instanceof Error) return next(result);
    res.status(200).json({result: true});
});

router.use((err,req,res,next)=>{
    console.log(err);
    res.status(500).json({result: false, message : err.message})
})

module.exports = router;