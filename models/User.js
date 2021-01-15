const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
   name: {
       type: String,
      required: [true, 'Please add a name']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 6,
      select: false
    },
    messages: [
      {
        from: {
          type: String,
          required:true
        },
        subject: {
          type: String,
          required: true
        },
        body: {
          type: String,
          required: true
        },
        isViewed: {
          type: Boolean,
          default: false
        },
        createdAt:{
          type: Date,
           default: Date.now
        }
        
      },
    ],
    sentmessages: [
      {
        to: {
          type: String,
          required:true
        },
        subject: {
          type: String,
          required: true
        },
        body: {
          type: String,
          required: true
        },
        createdAt:{
          type: Date,
           default: Date.now
        }
        
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now
    }
  })

  //Encrypt password using bcrtpyt
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Sign JWT and return
UserSchema.methods.getSignetJwtToken = function () {
  return jwt.sign(
    {
      id: this._id
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE
    }
  )
}

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

  module.exports = mongoose.model('User', UserSchema)