const Course = require('../models/Course');

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    console.log('All Courses Fetched:', courses); 
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    console.log('Course Fetched:', course); 
    res.status(200).json(course);
  } catch (error) {
    console.error('Error fetching course:', error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addCourse = async (req, res) => {
  try {
    if (!req.body.name || !req.body.department) {
      return res.status(400).json({ message: "Name and department are required" });
    }

    const newCourse = new Course({
      name: req.body.name,
      department: req.body.department,
      isOpen: req.body.isOpen || true,
    });

    const savedCourse = await newCourse.save();
    console.log('New Course Created:', savedCourse); 
    res.status(201).json(savedCourse);
  } catch (error) {
    console.error('Error creating course:', error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    course.name = req.body.name || course.name;
    course.department = req.body.department || course.department;
    course.isOpen = req.body.isOpen !== undefined ? req.body.isOpen : course.isOpen;

    const updatedCourse = await course.save();
    console.log('Course Updated:', updatedCourse); 
    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error('Error updating course:', error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await course.remove();
    console.log('Course Deleted:', course);
    res.status(200).json({ message: "Deleted course" });
  } catch (error) {
    console.error('Error deleting course:', error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
