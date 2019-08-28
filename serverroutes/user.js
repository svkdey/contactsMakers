const express=require('express');
const router=express.Router();

//@route Post api/users
//@desc register a user
//access Public

router.post('/',(req,res)=>{
    res.send("register a user")
})


module.exports=router;