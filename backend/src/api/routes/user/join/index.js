const {Router} = require('express');
const { join } = require('$/services/user');
const router = Router();
const passport = require('passport');
const passportService = require('$/services/passport.js');
const e = require('connect-flash');

router.get('/', (req, res)=>{
    //yoonseok Nuxt js
});

router.post('/process', (req,res,next)=>{
    passport.authenticate('local-join', (err,user,info) => {
        if(err) return next(err);
        if (!user) return res.status(401).json(info.message);

        res.status(200).json({result:'success', sid: user.sid})
    })(req, res, next);
});

router.use((err,req,res,next)=>{
    res.status(400).json({result: 'fail', message : err.message})
})




module.exports = router;