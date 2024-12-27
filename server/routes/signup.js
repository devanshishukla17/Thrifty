const express = require('express');
const router = express.Router();
const Signup = require('../models/Profile.js');

router.post('/signup/save', async (req, res) => {
  try {
    const { username, email,password} = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find existing profile or create new one
    let signup = await Signup.findOne();
    
    if (signup) {
      // Update existing profile
      signup.username = username;
      signup.email = email;
      signup.password = password;
      signup.updatedAt = new Date();
    } else {
      // Create new profile
      signup = new Signup({
        username,
        email,
        password,
      });
    }

    await signup.save();
    res.status(200).json({ message: 'Details saved successfully', profile });
  } catch (error) {
    console.error('Error saving details:', error);
    res.status(500).json({ message: 'Server error saving details' });
  }
});

module.exports = router;