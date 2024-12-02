import React from 'react';
import { deleteCourse } from '../api';

function CourseList({ courses }) {
  const handleDelete = async (id) => {
    try {
      await deleteCourse(id); 
      alert('Course deleted successfully');
    } catch (error) {
      alert('Failed to delete course. Please try again.');
    }
  };

  if (!Array.isArray(courses)) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Course List</h2>
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              {course?.name ? (
                <strong>{course.name}</strong>
              ) : (
                <span>Unnamed Course</span>
              )}
              <span> - Department: {course.department ? course.department : 'Unknown'}</span>
              <span> - Status: {course.isOpen ? 'Open' : 'Closed'}</span>
              <button onClick={() => handleDelete(course.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CourseList;
