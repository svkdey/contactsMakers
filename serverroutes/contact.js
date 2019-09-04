const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth=require("../middleware/auth");
//@route Get api/contacts
//@desc get all users contacts
//access private
const User=require("../models/User");
const Contact=require("../models/Contacts");

router.get('/', auth, async (req, res) => {
    try {
        const contacts=await Contact.find({user:req.user.id})
                                    .sort({date:-1});
        return res.json(contacts)
    } catch (error) {
        console.log(err)
    }
})

//@route Post api/contacts
//@desc add new contacts
//access public

router.post('/', [auth,[
    check('name','Name is required').not().isEmpty()
]],async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const {name,email,phone,type}=req.body;
        try {
          const newContact=new Contact({
              name,email,phone,type,user:req.user.id
          }) 
        const contact=await newContact.save();
        return res.json({contact});
        } catch (error) {
            console.log(err.message);
            return res.status(500).json({ success: false })
        }
})

router.put('/:id', auth,async (req, res) => {
    const { name, email, phone, type } = req.body;
    console.log(name, email, phone, type )
    // Build contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactFields },
            { new: true }
        );

        res.json(contact);
    } catch (err) {
        console.error(er.message);
        res.status(500).send('Server Error');
    }
})

router.delete('/:id', auth,async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Contact.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Contact removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;