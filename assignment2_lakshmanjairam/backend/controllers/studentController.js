const Student = require('../models/Student');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    console.log('All Students Fetched:', students); // Debug log
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('enrolledCourses completedCourses');
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    console.log('Student Fetched:', student); // Debug log
    res.json(student);
  } catch (error) {
    console.error('Error fetching student:', error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addStudent = async (req, res) => {
  const student = new Student({
    name: req.body.name,
    department: req.body.department,
    semester: req.body.semester,
    enrolledCourses: req.body.enrolledCourses,
    completedCourses: req.body.completedCourses,
  });

  try {
    const newStudent = await student.save();
    console.log('New Student Created:', newStudent); // Debug log
    res.status(201).json(newStudent);
  } catch (error) {
    console.error('Error creating student:', error.message);
    res.status(400).json({ message: "Failed to create student" });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    student.name = req.body.name || student.name;
    student.department = req.body.department || student.department;
    student.semester = req.body.semester || student.semester;
    student.enrolledCourses = req.body.enrolledCourses || student.enrolledCourses;
    student.completedCourses = req.body.completedCourses || student.completedCourses;

    const updatedStudent = await student.save();
    console.log('Student Updated:', updatedStudent); // Debug log
    res.json(updatedStudent);
  } catch (error) {
    console.error('Error updating student:', error.message);
    res.status(400).json({ message: "Failed to update student" });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await student.remove();
    console.log('Student Deleted:', student); // Debug log
    res.json({ message: "Deleted student" });
  } catch (error) {
    console.error('Error deleting student:', error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
