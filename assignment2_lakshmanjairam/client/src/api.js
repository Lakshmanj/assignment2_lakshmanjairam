import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const attachToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const getStudents = async () => {
  try {
    attachToken();
    const response = await api.get('/api/students');
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const addStudent = async (student) => {
  try {
    attachToken();
    const response = await api.post('/api/students', student);
    return response.data;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    attachToken();
    const response = await api.delete(`/api/students/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

export const updateStudent = async (id, updatedData) => {
  try {
    attachToken();
    const response = await api.put(`/api/students/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

export const getCourses = async () => {
  try {
    attachToken();
    const response = await api.get('/api/courses');
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const addCourse = async (course) => {
  try {
    attachToken();
    const response = await api.post('/api/courses', course);
    return response.data;
  } catch (error) {
    console.error('Error adding course:', error);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    attachToken();
    const response = await api.delete(`/api/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

export const updateCourse = async (id, updatedData) => {
  try {
    attachToken();
    const response = await api.put(`/api/courses/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};


export const registerUser = async (user) => {
  try {
    const response = await api.post('/api/auth/register', user);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/api/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    attachToken();
    const response = await api.get('/api/auth/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
