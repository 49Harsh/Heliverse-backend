const express = require('express');
const router = express.Router();
const TimeTable = require('../models/Timetable')


// Create time table entry
router.post('/create-timetable',async (req, res) => {
  try {
    const { day, subject, startTime, endTime } = req.body;
    const newTimeTable = new TimeTable({
      day,
      subject,
      startTime,
      endTime,
    });
    await newTimeTable.save();
    res.status(201).json(newTimeTable);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get teacher's time table
router.get('/my-timetable', async (req, res) => {
  try {
    const timeTable = await TimeTable.find();
    res.json(timeTable);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;

