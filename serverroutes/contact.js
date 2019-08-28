const express = require('express');
const router = express.Router();

//@route Get api/contacts
//@desc get all users contacts
//access private

router.get('/', (req, res) => {
    res.send("get a all contacts")
})

//@route Post api/contacts
//@desc add new contacts
//access public

router.post('/', (req, res) => {
    res.send("post contacts")
})

router.put('/:id', (req, res) => {
    res.send("update contatc")
})

router.delete('/:id', (req, res) => {
    res.send("delete contact")
})
module.exports = router;