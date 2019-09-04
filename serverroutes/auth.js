const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require("config");
const auth=require('../middleware/auth')
const { check, validationResult } = require('express-validator');
const User = require('../models/User')

//@route Get /api/auth
//@desc get logged in a user
//access private

router.post('/', [
    check('email', 'valid email is required')
    .isEmail(),
    check('password', 'password minimum length should be greater than 5')
    .isLength({ min: 5 })],async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const {email,password}=req.body;
        try{
            let user=await User.findOne({email});
            if(!user){
                return res.status(400).json({msg:"Invalid Credentials"})
            }
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({ msg: "Invalid Credentials"})
            }
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 3600000,
            }, (err, token) => {
                if (err) throw err;
                return res.json({ token })
            })

        }catch(err){
            console.log(err.message);
            return res.status(500).json({ success: false })
        }
})

//@route Post api/users
//@desc check  user and get token
//access public

router.get('/',auth,async (req, res) => {
   try {
       const user=await User.findById(req.user.id).select('-password');
       return res.json(user)
   } catch (error) {
       console.log(err.message);
       return res.status(500).json({ success: false })
   }
})
module.exports = router;