import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Make sure axios is installed to send HTTP requests
import { USER_LOGIN } from '../utils/api';  // Adjust this import to your API route

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sending POST request to the backend API for login
      const response = await axios.post(USER_LOGIN, formData);
      
console.log(response.data);

      if (response.data.status === "success") {
        // On successful login, navigate to the home page (or any other page)
        setSuccess(response.data.message);
      
          navigate(response.data.redirectTo);  // Redirecting to home page (or any other route)
        
      } else {
        setError(response.data.message || 'Login failed, please try again.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError('user not registered');
    }

    // Hide success/error message after 3 seconds
    setTimeout(() => {
      setError('');
      setSuccess('');
    }, 3000);
  };

  return (
    <div className="container mb-5">
      <div className="row justify-content-center d-flex flex-md-row m-3 p-5">
        <div className="col-md-6 glass-effect col-lg-4">
          <h3 className="text-center mb-4">Login</h3>
          
          {/* Error and Success Messages */}
          {error && <div className="alert text-center alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                // value={formData.email}
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
                
                onChange={handleChange}
                required
              />
            </div>

            <div className="text-center mb-3">
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </div>
          </form>

          <div className="text-center">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
