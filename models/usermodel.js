const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the User schema
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  duration: { type: Number },
  subscription:{
    startDate: {type:Date},
    endDate: {type:Date}
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
