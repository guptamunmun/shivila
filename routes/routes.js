const express = require('express');
const router = express.Router();

const User=require("../models/usermodel")

router.post('/register', async (req, res) => {
  try {
    const { email, password, mobile } = req.body;

    // Validate the request body
    if (!email || !password || !mobile) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Create a new user instance
    const newUser = new User({
      email,
      password,
      mobile,
    });

    // Save the user to the database
    await newUser.save();

    // Return a success message
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle any errors that occurred during registration
    res.status(500).json({ error: 'Failed to register user' });
  }
});


  
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate the request body
      if (!email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Check if the user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Check if the provided password matches the stored password
      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Return a success message
      res.json({ message: 'Login successful' });
    } catch (error) {
      // Handle any errors that occurred during login
      res.status(500).json({ error: 'Failed to login' });
    }
  });
  
  //endpoint for adding subscription
  router.post('/subscription', async (req, res) => {
    try {
      const { userId, duration } = req.body;
  
      // Validate the request body
      if (!userId || !duration) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      // Fetch the user from the database
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Calculate the subscription end date based on the current date and duration
      const currentDate = new Date();
      const subscriptionEndDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + duration, currentDate.getDate());
    
  
      // Update the user's subscription details
      user.subscription = {
        startDate: currentDate,
        endDate: subscriptionEndDate,
      };
      await user.populate("subscription")
      console.log(user.subscription)
      user.duration = duration; // Set the duration field in the user model
      await user.save();
  
      // Return a success message
      res.json( user );
    } catch (error) {
      // Handle any errors that occurred during subscription
      res.status(500).json({ error: 'Failed to add subscription' });
    }
  });
  
//endpoint for checking subscription
  router.get('/subscription/:userId', async (req, res) => {
    
    try {
       
      const  userId = req.params.userId

  
      // Fetch the user from the database
      const user = await User.findById(userId);;
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  console.log(user)
      // Check if subscription is available and not expired
      const  subscription  = user.subscription;
      console.log(subscription)
      
      if (!subscription || !subscription.endDate ) {
        return res.send("subscription is not given")}
        if(subscription.endDate < new Date()) {
        return res.json({ message: 'Subscription is not active or has expired' });
      }
  
      // Return the subscription status
      return res.json({ message: 'Subscription is active' });
    } catch (error) {
      // Handle any errors that occurred during subscription checking
      res.status(500).json({ error: 'Failed to check subscription' });
    }
  });
  

  
module.exports = router;