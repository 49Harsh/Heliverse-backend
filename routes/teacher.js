const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');
const Classroom = require('../models/Classroom');
const timetable = require('../models/Timetable')

router.post('/create-timetable', async (req, res) => {
    const { day, subject, startTime, endTime } = req.body;

    try {
      const newEntry = new timetable({ day, subject, startTime, endTime });
      await newEntry.save();
      res.status(201).json(newEntry);
    } catch (error) {
      res.status(500).json({ message: 'Error creating timetable entry', error });
    }
});

router.get('/show-timetable', async (req, res) => {
  try {
    const timetable = await timetable.find();
    res.status(200).json(timetable);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching timetable', error });
  }
});


module.exports = router;