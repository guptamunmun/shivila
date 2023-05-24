const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

   
    name: {
        type: String,
        required: true,
        uppercase : true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique : true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        street: {type: String, trim: true},
        city: {type: String, trim: true},
        pincode: {type: String, trim: true}
      },
       deletedAt: {
        type: Date,
        trim: true
    }, //  the document is deleted
    isDeleted: { 
        type: Boolean, 
        default: false 
    },

}, { timestamps: true })


module.exports = mongoose.model('User', userSchema) //users
