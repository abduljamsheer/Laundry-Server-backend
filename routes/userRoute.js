const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');




router.use(express.json());

router.post("/register", async (req, res) => {

    const {
        name, email, phone, state,
        district, address, pincode,
        password
    } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [{ email }, { phone }]
        });
        if (existingUser) {
            return res.status(400).json({
                status: "Failed",
                message: "Account already exists"
            })
        }
        const Hash_Password = async () => {
            const hash = await bcrypt.hash(password, saltRounds);
            return hash
        }
        const hashed_password = await Hash_Password()
   

        const new_User = {
            name: name,
            email: email,
            phone: phone,
            state: state,
            district: district,
            address: address,
            pincode: pincode,
            password: hashed_password
        };
        
        const response = await User.create(new_User);
    

        res.status(201).json({
            status: "Success",
            message: "Register Successfully",
        })
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: err.message
        })
    }
})

router.post("/login", async (req, res) => {
     let user;
    try {
        const { contact, password } = req.body;
        user = await User.findOne({ email: contact });
       
        
        if(!user){
            user = await User.findOne({ phone: contact });
        }
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "Account not found, Please Register"
            })
        }
        const response = await bcrypt.compare(password, user.password);
        if (response) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret_key@123', { expiresIn: '1h' });


            return res.json({
                status: "Success",
                token: token,
                name: user.name
            })
        } else {
            return res.status(401).json({
                status: "Failed",
                message: "Invalid credentials"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: "Failed",
            message: err.message
        })
    }
})

module.exports = router;