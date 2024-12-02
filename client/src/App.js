import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getStudents, getCourses } from './api';
import AddStudent from './components/AddStudent';
import AddCourse from './components/AddCourse';
import StudentList from './components/StudentList';
import CourseList from './components/CourseList';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';

function App() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      const fetchStudents = async () => {
        try {
          const response = await getStudents();
          setStudents(response);
        } catch (error) {
          console.error('Error fetching students:', error);
        }
      };
      fetchStudents();

      const fetchCourses = async () => {
        try {
          const response = await getCourses();
          setCourses(response);
        } catch (error) {
          console.error('Error fetching courses:', error);
        }
      };
      fetchCourses();
    }
  }, [token]);

  const handleAddStudent = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  const handleAddCourse = (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  const handleLogin = (userToken) => {
    setToken(userToken);
    localStorage.setItem('token', userToken);
  };

  return (
    <Router>
      <div>
        <h2>Student and Course Management</h2>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/add-student" element={token ? <AddStudent onAdd={handleAddStudent} /> : <Navigate to="/login" />} />
          <Route path="/add-course" element={token ? <AddCourse onAdd={handleAddCourse} /> : <Navigate to="/login" />} />
          <Route path="/students" element={token ? <StudentList students={students} /> : <Navigate to="/login" />} />
          <Route path="/courses" element={token ? <CourseList courses={courses} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
