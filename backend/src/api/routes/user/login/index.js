const {Router} = require('express');
const router = Router();
const passport = require('passport');
const passportService = require('$/services/passport.js');
const flash = require('connect-flash');

router.get('/', (req, res)=>{
    res.send('hi');
});

router.post('/process', (req,res,next)=>{
    passport.authenticate('local-login', (err,user,info) => {
        if(err) return next(err);
        if (!user) return res.status(401).json({result:false ,message: info.message});
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.status(200).json({result:true, sid: user});
        });
    })(req, res, next);
});

router.get('/check', (req,res,next)=>{
    let user = req.user
    if (!user) return res.status(401).json({result:false ,message: "로그인 되어 있지 않습니다."});
    console.log(req.user);
    return res.status(200).json({result:true, sid: user});
});

router.use((err,req,res,next)=>{
    res.status(400).json({result: false, message : err.message})
})

module.exports = router;