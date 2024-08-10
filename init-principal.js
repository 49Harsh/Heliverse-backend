const mongoose = require('mongoose');
const Principal = require('./models/principal');

mongoose.connect('mongodb://localhost/classroom_website')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'))

async function initPrincipal() {
  try {
    const existingPrincipal = await Principal.findOne({ email: 'principal@classroom.com' });
    if (!existingPrincipal) {
      const principal = new Principal({
        email: 'principal@classroom.com',
        password: 'Admin'
      });
      await principal.save();
      console.log('Principal account created successfully');
    } else {
      console.log('Principal account already exists');
    }
  } catch (error) {
    console.error('Error creating principal account:', error);
  } finally {
    mongoose.disconnect();
  }
}

initPrincipal();