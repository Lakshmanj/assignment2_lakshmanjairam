const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { ensureAuthenticated } = require('../middleware/auth'); 

router.get('/', ensureAuthenticated, studentController.getAllStudents); 
router.get('/:id', ensureAuthenticated, studentController.getStudentById);
router.post('/', ensureAuthenticated, studentController.addStudent);
router.put('/:id', ensureAuthenticated, studentController.updateStudent);
router.delete('/:id', ensureAuthenticated, studentController.deleteStudent);

module.exports = router;
