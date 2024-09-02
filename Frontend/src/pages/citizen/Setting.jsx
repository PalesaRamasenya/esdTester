import React, { useState } from 'react';
import '../../scss/settings.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
  // State for notification preferences
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);

  // Handle checkbox changes
  const handleEmailChange = (event) => {
    setEmailNotifications(event.target.checked);
  };

  const handleSmsChange = (event) => {
    setSmsNotifications(event.target.checked);
  };

  // Handle form submission
  const handlePreferencesSubmit = (event) => {
    event.preventDefault();

    // Handle saving the preferences
    // For now, just log them
    console.log('Email Notifications:', emailNotifications);
    console.log('SMS Notifications:', smsNotifications);

    // Optionally send this data to a backend or save to local storage
  };

  return (
    <div className="settings-page-wrapper">
      <div className="back-button-container">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="goback-button"
          onClick={() => window.history.back()} // Go back to the previous page
        />
      </div>

      <div className="settings-page">
        <h1>Settings</h1>

        <section className="section1">
          <h2>Change Password</h2>
          <form className='form1'>
            <div className="form-group1">
              <label htmlFor="current-password">Current Password:</label>
              <input className='input1' type="password" id="current-password" name="current-password" />
            </div>
            <br/>
            <div className="form-group1">
              <label htmlFor="new-password">New Password:</label>
              <input className='input1' type="password" id="new-password" name="new-password" />
            </div>
            <br/>
            <div className="form-group1">
              <label htmlFor="confirm-password">Confirm New Password:</label>
              <input className='input1' type="password" id="confirm-password" name="confirm-password" />
            </div>
            <br/>
            <button type="submit" className="btn-save">Change Password</button>
          </form>
        </section>

        <section className="section">
          <h2>Notification Preferences</h2>
          <form onSubmit={handlePreferencesSubmit}>
            <div className="form-group">
              <label htmlFor="email-notifications">Email Notifications:</label>
              <input
                type="checkbox"
                id="email-notifications"
                name="email-notifications"
                checked={emailNotifications}
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="sms-notifications">SMS Notifications:</label>
              <input
                type="checkbox"
                id="sms-notifications"
                name="sms-notifications"
                checked={smsNotifications}
                onChange={handleSmsChange}
              />
            </div>
            <button type="submit" className="btn-save">Save Preferences</button>
          </form>
        </section>

        <section className="section">
          <h2>Account Deletion</h2>
          <p>
            If you wish to delete your account, please contact our support team at <a href="mailto:support@extremeservice.com">support@extremeservice.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Settings;
