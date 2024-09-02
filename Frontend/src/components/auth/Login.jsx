import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import img1 from '../../assets/emalahleni.png';
import axios from 'axios';
import '../../scss/login.scss';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const { user, token } = response.data;
  
      // Store token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.roleName);
      localStorage.setItem('user', JSON.stringify(user));  // Correctly stringify the user object
  
      // Navigate based on roleName
      switch (user.roleName) {
        case 'RESIDENT':
          navigate('/homepage');
          break;
        case 'ADMIN':
          navigate('/adminhome');
          break;
        case 'MANAGER':
          navigate('/landing');
          break;
        case 'SUPERVISOR':
          navigate('/suplanding');
          break;
        default:
          alert('You do not have the right role to access this page.');
          break;
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        console.error('Error:', error.message);
        alert('An error occurred. Please try again.');
      }
    }
  };
  

  return (
    <div className='home-page'>
      <div className='login-section'>
        <div className='form-heading'>
          <img src={img1} alt="Login" />
          <h1>Extreme Service Delivery Portal</h1>
          <p>Login to your account.</p>
        </div>
        <br />
        <form onSubmit={handleSubmit}>
          <div className='details-div'>
            <span className='icon'><FontAwesomeIcon icon={faEnvelope} className='login-icon' /></span>
            <input type='email' name='email' placeholder='Email Address' required />
          </div>
          <div className='details-div'>
            <span className='icon'><FontAwesomeIcon icon={faLock} className='login-icon' /></span>
            <input type='password' name='password' placeholder='Password' required />
          </div>
          <p>
            Don't have an account? <Link to="/signup" className="signup-link">Sign Up.</Link>
          </p>
          <button type='submit' className='btn-login'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;