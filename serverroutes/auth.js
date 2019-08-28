const express = require('express');
const router = express.Router();

//@route Get api/users
//@desc get logged in a user
//access private

router.get('/', (req, res) => {
    res.send("get a user")
})

//@route Post api/users
//@desc check  user and get token
//access public

router.post('/', (req, res) => {
    res.send("check user")
})
module.exports = router;