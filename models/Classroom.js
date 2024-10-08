const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true 
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'teacher' 
  },
  student: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'student' 
  }],
  startTime: { 
    type: String, 
    required: true 
  },
  endTime: { 
    type: String, 
    required: true 
  },
  days: [{ 
    type: String, 
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] 
  }]
});

module.exports = mongoose.model('Classroom', classroomSchema);