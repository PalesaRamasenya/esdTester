import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../scss/Admin/monthly.scss'; // Import the SCSS file
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AdminReportPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reports, setReports] = useState([]);

  const handleGenerateReports = () => {
    const filteredReports = getReportsByDateRange(startDate, endDate);
    setReports(filteredReports);
  };

  const getReportsByDateRange = (start, end) => {
    const dummyReports = [
      { id: 1, date: '2024-08-20', content: 'Report 1' },
      { id: 2, date: '2024-08-21', content: 'Report 2' },
      { id: 3, date: '2024-08-22', content: 'Report 3' },
    ];

    return dummyReports.filter(
      (report) =>
        new Date(report.date) >= new Date(start) &&
        new Date(report.date) <= new Date(end)
    );
  };

  return (
    <div className="admin-report-page">
       <FontAwesomeIcon
          icon={faArrowLeft}
          className="back-button"
          onClick={() => window.history.back()} // Go back to the previous page
        />
      <h1>Admin Report Page</h1>
      <div className="date-filter">
        <div className="date-picker-group">
          <label htmlFor="start-date">Start Date:</label>
          <DatePicker
            id="start-date"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div className="date-picker-group">
          <label htmlFor="end-date">End Date:</label>
          <DatePicker
            id="end-date"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <Link to="/monthlydetail">
          <button className="generate-button" onClick={handleGenerateReports}>
            Generate Reports
          </button>
        </Link>
      </div>
      <ul className="report-list">
        {reports.map((report) => (
          <li key={report.id} onClick={() => window.location.href = `/monthlydetails/${report.id}`}>
            <span className="report-date">{report.date}</span>
            <span className="report-content">{report.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminReportPage;
