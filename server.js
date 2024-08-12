const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://user1:user@cluster0.kumlq.mongodb.net/')
.then(() =>{
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.log('Error connecting to MongoDB:', err);
});

app.use(bodyParser.json());

// app.use('/', (req, res) =>{
//     res.send('Hello World!')
// })

// Routes
const authRoutes = require('./routes/auth');
const principalRoutes = require('./routes/principal');
const teacherRoutes = require('./routes/teacher');

app.use('/auth', authRoutes);
app.use('/principal', principalRoutes);
app.use('/teacher', teacherRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

