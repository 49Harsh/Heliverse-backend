const express = require('express');
const router = express.Router();
const Principal = require('../models/principal');
const Teacher = require('../models/teacher');
const Student = require('../models/student');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    let user = await Principal.findOne({ email, password });
    if (user) return res.json({ role: 'principal', user });

    user = await Teacher.findOne({ email, password });
    if (user) return res.json({ role: 'teacher', user });

    user = await Student.findOne({ email, password });
    if (user) return res.json({ role: 'student', user });

    res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;