import React, { useState } from 'react';
import { addStudent } from '../api';

function AddStudent({ onAdd }) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !department || !semester) {
        setError('All fields are required');
        return;
      }

      const newStudent = { name, department, semester };
      const response = await addStudent(newStudent);

      onAdd(response);

      setName('');
      setDepartment('');
      setSemester('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add student. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <h3>Add Student</h3>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Semester"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
        required
      />
      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudent;
