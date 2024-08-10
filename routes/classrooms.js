const express = require('express');
const router = express.Router();
const Classroom = require('../models/Classroom');
const User = require('../models/User');

router.post('/', async (req, res) => {
  try {
    const classroom = new Classroom(req.body);
    await classroom.save();
    res.json({ success: true, classroom });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const classrooms = await Classroom.find().populate('teacher').populate('students');
    res.json(classrooms);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const classroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, classroom });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Classroom.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/:id/assign-teacher', async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    const teacher = await User.findById(req.body.teacherId);
    
    if (!classroom || !teacher) {
      return res.status(404).json({ success: false, message: 'Classroom or teacher not found' });
    }
    
    classroom.teacher = teacher._id;
    teacher.classroom = classroom._id;
    
    await classroom.save();
    await teacher.save();
    
    res.json({ success: true, classroom });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.post('/:id/assign-student', async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    const student = await User.findById(req.body.studentId);
    
    if (!classroom || !student) {
      return res.status(404).json({ success: false, message: 'Classroom or student not found' });
    }
    
    classroom.students.push(student._id);
    student.classroom = classroom._id;
    
    await classroom.save();
    await student.save();
    
    res.json({ success: true, classroom });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;