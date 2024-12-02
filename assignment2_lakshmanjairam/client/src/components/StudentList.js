import React, { useState, useEffect } from 'react';
import { getStudents } from '../api';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        console.log('Fetched students:', data);
        setStudents(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setError('Failed to fetch students');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (students.length === 0) {
    return <div>No students available.</div>;
  }

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <strong>{student.name}</strong>
            <ul>
              <li>ID: {student.id}</li>
              <li>Department: {student.department}</li>
              <li>Semester: {student.semester}</li>
              <li>
                Enrolled Courses: {student.enrolledCourses.length > 0 ? student.enrolledCourses.join(', ') : 'None'}
              </li>
              <li>
                Completed Courses: {student.completedCourses.length > 0 ? student.completedCourses.join(', ') : 'None'}
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
