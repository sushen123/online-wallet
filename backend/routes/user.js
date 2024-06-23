const { User } = require('../db');
const  jwtkey  = require('../cofig');
const { Account } = require('../db');
const authenticateToken = require('../middlewares')
const jwt = require('jsonwebtoken')
const bcyrpt = require('bcrypt');
const mongoose = require("mongoose")

const zod = require('zod')

const express = require('express')

const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})


router.post("/signup",async (req,res) => {
    const {success} = signupBody.safeParse(req.body)

    if(!success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }


    const username = req.body.username;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const password = req.body.password;
    
   
try {
    const existingUser = await User.findOne({username: username});
    if(existingUser){
      return  res.status(409).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcyrpt.hash(password, 10)
   
   const newUser = await User.create({
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword
    })
   
    await newUser.save()

    const userId = newUser._id
    await Account.create({
       userId: userId,
        balance: 1 + Math.random() * 1000
    
})

  
    const token = jwt.sign({id: newUser._id} , jwtkey, {expiresIn: "1h"});
    res.status(200).json({
        message: "User Created Successfully",
        token
    })
}
catch(error) {
    res.status(500).json({
        message: "Error creating user",
        error: error.message
    })
    
}
})

const siginBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})


router.post("/signin", async(req,res) =>{

    const {success} = siginBody.safeParse(req.body)

    if(!success) {
        return res.status(411).json({
            message: "Incorrect Inputs"
        })
    }

    const {username, password} = req.body;


    
    try {
    const user = await User.findOne({username: username});
    if(!user)
        return res.status(404).json({
            message: "Invalid Username or Password "
        })
    

    const isPasswordValid = await bcyrpt.compare(password, user.password)
    if(!isPasswordValid) {
        return res.status(404).json({
            message: "Invalid  Username or Password"
        })
    }
    const token = jwt.sign({id: user._id}, jwtkey, {expiresIn: "1h"})
    res.status(200).json({
        message: "User Login Successfully",
        token
    })
    }
  catch(error) {
        res.status(500).json({
            message: "Error loging user",
            error: error.message
        })
    }
})

const updateBody  = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})


router.put('/update', authenticateToken , async(req,res) => {
        const {success} = updateBody.safeParse(req.body)
        if(!success) {
         return   res.status(411).json({
                message: "Error while updating information"
            })
        }

        await User.updateOne({_id: req.userId}, req.body)

        res.json({
            message: "Updated successfully",
            
        })
})

router.get('/search',authenticateToken, async(req,res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
                lastName: {
                    "$regex": filter
                }
            
        }]
    })

    res.json({
        user: users.map(user => ({
            
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
            
        }))
    })
} )

router.get("/name", authenticateToken,async (req,res) => {
    const userId = req.userId;

    const user = await User.findById({_id: userId});
    const name  = user.firstName
   
    if(!user){
     return   res.status(404).json({
            message: "User not found"
        })
    }

    res.status(200).json({
        name: name
    })
})


module.exports = router