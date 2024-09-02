import React from 'react';
import { Link } from 'react-router-dom';
import '../../scss/profile.scss'; // Ensure this file exists and is correctly styled
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


  console.log('User data:', user);

  return (
    <div className='profile-page'>
      {/* Back button positioned separately */}
      <div className="back-button-container">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="back-button"
          onClick={() => window.history.back()}
        />
      </div>

      <div className="profile-header">
        <img 
          src="https://via.placeholder.com/150" // Placeholder for profile picture
          alt="Profile"
          className="profile-picture"
        />
        <h2 className="full-name">{user.name} {user.surname}</h2>
      </div>

      <section className="section">
        <h2>Personal Information</h2>
        <p><strong>Username:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Full Name:</strong> {user.name} {user.surname}</p>
        <p><strong>Phone:</strong> {user.contact}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </section>

      <Link to='/editprofile'>
        <button className="edit-profile-button">Edit Profile</button>
      </Link>
    </div>
  );


export default Profile;
