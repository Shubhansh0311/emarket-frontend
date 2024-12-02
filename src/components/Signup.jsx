import React, { useState } from 'react';
import axios from 'axios';  // Ensure axios is installed
import { USER_SIGNUP } from '../utils/api';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Password validation function
  const validatePassword = (password) => {
    // Regular expression to check the password criteria
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  // Email validation function
  const validateEmail = (email) => {
    // Regular expression to check for valid email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure email is valid
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      setSuccess('');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Ensure password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setSuccess('');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Validate the password using regex
    if (!validatePassword(formData.password)) {
      setError('Password is not strong enough');
      setSuccess('');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      const response = await axios.post(USER_SIGNUP, formData); // Adjust API endpoint as needed

      if (response.data.status === "unsuccess") {
        setError(response.data.message);
        setSuccess('');
        return;
      }

      setSuccess('User successfully registered!');
      setFormData({ email: '', password: '', confirmPassword: '', fullName: '' });
      setError('');

      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('email already exist.');
      setSuccess('');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="container mb-5">
      <div className="row justify-content-center d-flex flex-md-row m-5 p-1">
        <div className="col-md-6 glass-effect col-lg-6">
          <h3 className="text-center mb-2">Sign Up</h3>
          {error && <div className="alert text-center alert-danger">{error}</div>}
          {success && <div className="alert text-center alert-success">{success}</div>}
          <form onSubmit={handleSubmit} className="text-light">
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="text-center mb-2">
              <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            </div>
          </form>

          <div className="text-center">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
