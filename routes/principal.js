const express = require('express');
const router = express.Router();
const Principal = require('../models/principal');
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Classroom = require('../models/Classroom');


// for creating clasrrom
router.post('/create-classroom', async (req, res) => {
  const { name, teacherId, student, startTime, endTime, days } = req.body;
  
    try {
    console.log('Teacher ID:', teacherId); // Debugging log
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      console.log('Teacher not found'); // Debugging log
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const classroom = new Classroom({ name, teacher: teacherId, student, startTime, endTime, days });
    await classroom.save();

    teacher.classroom = classroom._id;
    await teacher.save();

    res.json(classroom);
  } catch (error) {
    console.error('Error:', error); // Debugging log
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

// for creating teacher
router.post('/create-teacher', async (req, res) => {
  const {name, email, password } = req.body;
  
  try {
    const teacher = new Teacher({name, email, password });
    await teacher.save();
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


// for creating student
router.post('/create-student', async (req, res) => {
  const {name, email, password} = req.body;
  
  try {
    
    const student = new Student({name, email, password });
    await student.save();

    // classroom.students.push(student._id);
    // await classroom.save();

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// for showing all student
router.get('/show-student', async(req,res) =>{
  try{
    const students = await Student.find();
    res.json(students);
  }
  catch(error){
    res.status(500).json({message: 'Server error'});
  }
})

module.exports = router;