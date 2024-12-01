const courses = require('../data/courseData');

let nextCourseId = courses.length + 1;

exports.getAllCourses = (req, res) => {
  try {
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getCourseById = (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const course = courses.find(c => c.id === courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addCourse = (req, res) => {
  try {
    if (!req.body.name || !req.body.department) {
      return res.status(400).json({ message: "Name and department are required" });
    }

    const newCourse = {
      id: nextCourseId++,
      name: req.body.name,
      department: req.body.department,
      isOpen: req.body.isOpen || true
    };

    courses.push(newCourse);
    res.status(201).json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateCourse = (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const course = courses.find(c => c.id === courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.name = req.body.name || course.name;
    course.department = req.body.department || course.department;
    course.isOpen = req.body.isOpen !== undefined ? req.body.isOpen : course.isOpen;

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteCourse = (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    const index = courses.findIndex(c => c.id === courseId);
    if (index === -1) return res.status(404).json({ message: "Course not found" });

    const deletedCourse = courses.splice(index, 1);
    res.status(200).json(deletedCourse[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
