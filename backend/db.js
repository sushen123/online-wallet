


const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGO_URL)

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true, trim: true,  minLength: 3, maxLength: 50},
    lastName: {type: String, required: true, minLength: 2, trim: true},
    username: {type: String, required: true,unique: true, trim: true},
    password: {type: String, required: true, minLength: 8}
        
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
})

const sendStatementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  transactionAmount: {
    type: Number,
    required: true
  },
  transactionId: {
    type: Number,
    required: true,
    unique: true
  },
  transactionDate: {
    type: Date,
    default: Date.now
  }
})

const recievedStatementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  transactionAmount: {
    type: Number,
    required: true
  },
  transactionId: {
    type: Number,
    required: true,
    unique: true
  },
  transactionDate: {
    type: Date,
   
  }
})


 const Account = mongoose.model('Account', accountSchema)
  const User = mongoose.model('User', userSchema)
  const sendStatement = mongoose.model('sendStatement', sendStatementSchema);
  const recievedStatement = mongoose.model('recievedStatement', recievedStatementSchema);

module.exports = {  
  Account, 
  User,
  sendStatement,
  recievedStatement
}