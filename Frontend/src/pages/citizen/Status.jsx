import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../../scss/status.scss';

function Status() {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/issue/my-issues', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setIssues(response.data);
            } catch (error) {
                console.error(error);
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert('An error occurred while fetching issues.');
                }
            }
        };

        fetchIssues();
    }, []);

    return (
        <div>
            <FontAwesomeIcon
                icon={faArrowLeft}
                className="back-button"
                onClick={() => window.history.back()}
            />
            <div className='status-heading'>
                <h1>Issue Report Status</h1>
            </div>

            {issues.length > 0 ? (
                issues.map((issue, index) => (
                    <div key={index} className='report-details'>
                        <h2>Issue Report Details</h2>
                        <div className='p-status'>
                            <p>Report Description: {issue.description}</p>
                            <p>Report Issue Type: {issue.issueCategory}</p>
                            <p>Report Date: {new Date(issue.dateReported).toLocaleDateString()}</p>
                            <p>Issue Status: {issue.status}</p>
                            {/* Check if issue_image_path is not null */}
                            {issue.issue_image_path && (
                                <div className="issue-image">
                                    <img src={`http://localhost:5000${issue.issue_image_path}`} alt="Issue" />
                                </div>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p>No issues reported yet.</p>
            )}

            <Link to='/homepage'>
                <button type='button' className='done-btn'>Done</button>
            </Link>
        </div>
    )
}

export default Status;
