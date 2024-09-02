import React from 'react';
import '../../../scss/Admin/monthlydetail.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// Dummy data
const dummyData = {
  parkName: "Model Park",
  issuesReported: [
    "Water",
    "Electricity",
    "Waste removal"
  ],
  pendingIssuesCount: 3,
  departmentComments: "All reported issues are currently being attended to.",
  communityComments: "still waiting"
};

const IssueDetail = ({ selectedMonth }) => {
  return (
    <div className="report-container">
      <div className="header">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="back-button"
          onClick={() => window.history.back()} // Go back to the previous page
        />
        <h1>{selectedMonth} Report</h1>
      </div>
      <div className="content">
        <div className="left-section">
          <h2>{dummyData.parkName}</h2>
          <div className="image-placeholder">
            <span>Image</span>
          </div>
          <button className="download-button">Download Report</button>
        </div>
        <div className="right-section">
          <h3>Issues Reported:</h3>
          <ul>
            {dummyData.issuesReported.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
          <h3>Pending Issues:</h3>
          <p>{dummyData.pendingIssuesCount}</p>
          <h3>Department Comments:</h3>
          <p>{dummyData.departmentComments}</p>
          <h3>Community Comments:</h3>
          <p>{dummyData.communityComments}</p>
        </div>
      </div>
      <div className="footer">
        {/* Footer content can go here */}
      </div>
    </div>
  );
};

export default IssueDetail;
