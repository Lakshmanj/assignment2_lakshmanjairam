const students = require('../data/studentData');

let nextStudentId = students.length + 1;

exports.getAllStudents = (req, res) => {
  try {
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getStudentById = (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const averageGrade = student.completedCourses.length
      ? student.completedCourses.reduce((acc, grade) => acc + grade, 0) / student.completedCourses.length
      : 0;
    res.json({ ...student, averageGrade });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addStudent = (req, res) => {
  try {
    const { name, department, semester, enrolledCourses, completedCourses } = req.body;
    if (!name || !department) {
      return res.status(400).json({ message: "Name and department are required" });
    }

    const newStudent = {
      id: nextStudentId++,
      name,
      department,
      semester,
      enrolledCourses: enrolledCourses || [],
      completedCourses: completedCourses || []
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateStudent = (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    student.name = req.body.name || student.name;
    student.department = req.body.department || student.department;
    student.semester = req.body.semester || student.semester;
    student.enrolledCourses = req.body.enrolledCourses || student.enrolledCourses;
    student.completedCourses = req.body.completedCourses || student.completedCourses;

    res.json(student);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteStudent = (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === studentId);
    if (index === -1) return res.status(404).json({ message: "Student not found" });

    const deletedStudent = students.splice(index, 1);
    res.json(deletedStudent[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
