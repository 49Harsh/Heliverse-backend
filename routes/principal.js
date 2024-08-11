const express = require('express');
const router = express.Router();
const Principal = require('../models/principal');
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Classroom = require('../models/Classroom');


// for creating clasrrom
router.post('/create-classroom', async (req, res) => {
  const { name, teacherId, startTime, endTime, days } = req.body;
  
  try {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    const classroom = new Classroom({ name, teacher: teacherId, startTime, endTime, days });
    await classroom.save();

    teacher.classroom = classroom._id;
    await teacher.save();

    res.json(classroom);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// for creating teacher
router.post('/create-teacher', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const teacher = new Teacher({ email, password });
    await teacher.save();
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// for creating student
router.post('/create-student', async (req, res) => {
  const { email, password} = req.body;
  
  try {
    // const classroom = await Classroom.findById(classroomId);
    // if (!classroom) return res.status(404).json({ message: 'Classroom not found' });

    const student = new Student({ email, password });
    await student.save();

    // classroom.students.push(student._id);
    // await classroom.save();

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;