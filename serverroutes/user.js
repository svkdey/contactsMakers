const express = require('express');
const router = express.Router();
var bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require("config")
const { check, validationResult } = require('express-validator');
const User = require('../models/User')

//@route Post api/users
//@desc register a user
//access Public

router.post('/', [
    check('name', 'name is required')
        .not()
        .isEmpty(),
    check('email', 'valid email is required')
        .isEmail(),
    check('password', 'password minimum length should be greater than 5')
        .isLength({ min: 5 })],async (req, res) => {
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()})
            }
           const {name,email,password}=req.body;
           try{
            let user=await User.findOne({email});
            if(user){
                return res.status(400).json({msg:"Users already exists"});

            }
            user=new User({
                name,email,password
            });
            const salt=await bcrypt.genSalt(10);
            // console.log(salt)
            user.password=await bcrypt.hash(user.password,salt);
            // console.log(user)
                await user.save();
            const payload={
                user:{
                    id:user.id
                }
            }

               jwt.sign(payload, config.get('jwtSecret'),{
                   expiresIn:3600000,
               },(err,token)=>{
                   if(err) throw err;
                   return res.json({token})
               })

            // return res.status(200).json({success:true}) 
            // return res.send("saved")




           }catch(err){
                console.log(err.message);
                return res.status(500).json({success:false})
           }

        })


module.exports = router;