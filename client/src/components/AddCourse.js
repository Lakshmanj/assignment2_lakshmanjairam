import React, { useState } from 'react';
import { addCourse } from '../api';

function AddCourse({ onAdd }) {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !department) {
        setError('Both name and department are required');
        return;
      }
      const newCourse = { name, department, isOpen };
      const response = await addCourse(newCourse);
      onAdd(response);
      setName('');
      setDepartment('');
      setIsOpen(true);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add course. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="course-form">
      <h3>Add Course</h3>
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
      <label>
        <input
          type="checkbox"
          checked={isOpen}
          onChange={(e) => setIsOpen(e.target.checked)}
        />
        Open
      </label>
      <button type="submit">Add Course</button>
    </form>
  );
}

export default AddCourse;
