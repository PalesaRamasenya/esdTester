import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import '../../../scss/Supervisor/writereport.scss';
import { Link } from 'react-router-dom';


const ReportPage = () => {
 
  return (
    <>
    
    <div className="home-back-button-container">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="home-back-button"
          onClick={() => window.history.back()} // Go back to the previous page
        />
    </div>
        
    <div className="report-page-container">
      <div className="content">
       
        <h2>Write report</h2>

        <div className="details-div">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <input
            type="email"
            className="email-input"
            placeholder="Enter your email..."
          />
        </div>

        <textarea
          className="report-textarea"
          placeholder="Write your report here..."
        ></textarea>

        <Link to='/submittedreport'>
          <button className="submit-button">Submit</button>
        </Link>
      </div>
    </div>
    </>
  );
}

export default ReportPage;
