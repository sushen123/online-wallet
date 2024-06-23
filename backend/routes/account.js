const express = require('express');
const authenticateToken = require('../middlewares');
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
const jwtkey = require('../cofig');

const { Account } = require('../db')
const { sendStatement } = require('../db')
const { recievedStatement } = require('../db')
const { User } = require('../db')


const router = express.Router();

router.get('/balance', authenticateToken, async (req,res) => {
   

    try {
        
   const userId = req.userId;
   
    const account = await Account.findOne({userId: userId})

    if(!account) {
        return res.status(404).json({
            message: "Account not found"
        })
    }
        
    
        res.status(200).json({
            balance: account.balance
        })

    }
    catch(error) {
        
        res.status(500).json({
            message: "Error Checking Balance"
        })
    }
})

router.post("/transfer", authenticateToken, async(req,res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
   
    const toAccountId = req.body.toAccountId;
    const amount = parseInt(req.body.balance);
    const userId = req.userId
    
    
    if (isNaN(amount) || amount <= 0) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid transfer amount"
        });
    }

    const account = await Account.findOne({
        userId: userId
    } )


   try {
   

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance"
        })
    }

    const toAccount = await Account.findOne({ userId: toAccountId});
    if(!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account"
        })
    }


   await Account.findOneAndUpdate({userId: req.userId}, {
       $inc: {
           balance: -amount
       }
   }, {session})

   await Account.findOneAndUpdate({userId: toAccountId}, {
       $inc: {
           balance: amount
       }
   }, {session})
   const send = await User.findById({_id: userId })
   const recieve = await User.findById({_id: toAccountId })

   const  transactionId = parseInt(Math.floor(1000 + Math.random() * 1000))

   await session.commitTransaction();
   res.status(200).json({
       message: "Transfer Successfully",
       senderName:  send.firstName + " " + send.lastName,
       recieverName: recieve.firstName + " " + recieve.lastName,
       transactionId: transactionId,
       amount: amount
   })
  
   const date = Date.now()



   await sendStatement.create({
    userId: userId,
    name: send.firstName + " " + send.lastName,
    transactionAmount: amount,
    transactionId: transactionId,
    transactionDate: date
   })

  
   await recievedStatement.create({
    userId: toAccountId,
    name: recieve.firstName + " " + recieve.lastName,
    transactionAmount: amount,
    transactionId: transactionId,
    transactionDate: date
   })



} catch (error) {
   await session.abortTransaction();
   throw error
} finally {
   session.endSession();
}
})


router.get("/statement", authenticateToken, async(req,res) => {
    const userId = req.userId;

    const recieve = await recievedStatement.find({userId: userId})
    const recievedWithStatus = recieve.map((statement) => {
        return {
            ...statement._doc,
            status: "Recieve"
        }
    })

    const send = await sendStatement.find({userId: userId})
    const sendWithStatus = send.map((statement) => {
        return {
            ...statement._doc,
            status: "Send"
        }
    })

    const statements = [...sendWithStatus, ...recievedWithStatus];

    statements.sort((a,b) => new Date(b.transactionDate) - new Date(a.transactionDate) )

    const today = new Date();
        today.setHours(0, 0, 0, 0);

        const formattedStatements  = statements.map((statement) => {
            
            const transactionDate = new Date(statement.transactionDate);

            let formattedDate;

            if (transactionDate >=today && transactionDate < new Date(today.getTime() + 86400000)) {
                formattedDate = transactionDate.toLocaleTimeString(([], { hour: '2-digit', minute: '2-digit' }));
            }
            else {
                formattedDate = transactionDate.toISOString().split('T')[0];
            }

            return {
                ...statement,
                transactionDate: formattedDate
            }
        })


    res.status(200).json({
        statements: formattedStatements
    })
    

})



module.exports = router