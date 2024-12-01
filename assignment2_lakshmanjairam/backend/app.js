const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const connectMongo = require('connect-mongo');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const students = require('./routes/students');
const courses = require('./routes/courses');
const authRoutes = require('./routes/auth'); 
const PORT = process.env.PORT || 3000;

dotenv.config();

connectDB();

app.use(cors({
  origin: 'http://localhost:3001',
}));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: connectMongo.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/api/students', students);
app.use('/api/courses', courses);
app.use('/api/auth', authRoutes);

app.use(express.static(path.join(__dirname, '../client/build')));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
