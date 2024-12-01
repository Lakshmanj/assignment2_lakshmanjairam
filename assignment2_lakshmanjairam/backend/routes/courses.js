const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { ensureAuthenticated } = require('../middleware/auth');

router.get('/', ensureAuthenticated, courseController.getAllCourses);
router.get('/:id', ensureAuthenticated, courseController.getCourseById);
router.post('/', ensureAuthenticated, courseController.addCourse);
router.put('/:id', ensureAuthenticated, courseController.updateCourse);
router.delete('/:id', ensureAuthenticated, courseController.deleteCourse);

module.exports = router;
