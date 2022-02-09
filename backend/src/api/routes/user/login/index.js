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
        if (!user) return res.status(401).json(info.message);
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            res.header({
                'Access-Control-Allow-Origin' : 'http://localhost:3000',
                'Access-Control-Allow-Credentials': true,
                'Vary': 'Origin'
            });
            return res.status(200).json({result:true, sid: user.sid});
        });
    })(req, res, next);
});

router.use((err,req,res,next)=>{
    res.status(400).json({result: false, message : err.message})
})

module.exports = router;