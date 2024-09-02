import React, { useState, useEffect } from 'react';
import '../../scss/homepage.scss'; 
import person from '../../assets/person.jpg';
import logo from '../../assets/reportlogo.jpeg';
// Import other images for the slideshow
import img2 from '../../assets/road_potholes.webp';
import img3 from '../../assets/water.jpg';
import img4 from '../../assets/pothole2.jpg';
import img5 from '../../assets/road1.jpg';
import img6 from '../../assets/pothole1.jpg';
import img7 from '../../assets/Live-wires-from-electricity-thieves1.jpg';
import img8 from '../../assets/pipe3.jpg';
import img9 from '../../assets/infrastructure.jpg';
import img10 from '../../assets/elect2.jpg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faPeopleGroup, faQuestionCircle, faComments, faRightFromBracket, faUser, faChartBar, faBell } from '@fortawesome/free-solid-svg-icons';

const images = [
    img2, img3, img4, img5, img6, img7, img8, img9, img10
];

const Homepage = ({ handleLogout }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, []);

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="citizen-dashboard">
            <aside className="sidebar">
                <img src={person} className="profile-pic" alt="Profile" />
                <h2>{user.name} {user.surname}</h2> {/* Display the user's name and surname */}
                <Link to='/profile'><p className="links"><FontAwesomeIcon icon={faUser} className="dash-icon" /> Profile</p></Link>
                <Link to='/status'><p className="links"><FontAwesomeIcon icon={faChartBar} className="dash-icon" /> View Issue Status</p></Link>
                <Link to='/newsfeed'><p className="links"><FontAwesomeIcon icon={faComments} className="dash-icon" /> Issues Newsfeed</p></Link>
                <Link to='/about'><p className="links"><FontAwesomeIcon icon={faPeopleGroup} className="dash-icon" /> About Us</p></Link>
                <Link to='/help'><p className="links"><FontAwesomeIcon icon={faQuestionCircle} className="dash-icon" /> Help</p></Link>
                <Link to='/settings'><p className="links"><FontAwesomeIcon icon={faGear} className="dash-icon" /> Settings</p></Link>
                <Link to='/logoutpage'><p className="links" onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} className="dash-icon" /> Sign out</p></Link>
            </aside>

            <main className="content">
                {/* Slideshow Container */}
                <div className="slideshow-container">
                    <img src={images[currentIndex]} alt="Slideshow" className="slideshow-image" />
                </div>

                <div className="welcome-message">
                    <h1 className='heading'>Hey {user.name}, And Welcome Back</h1>
                    <p>We're glad to have you back on our platform!</p>
                </div>
                <div className="report-prompt">
                    <p>Do you have an Issue to Report?</p>
                    <img src={logo} alt="Report Icon" className="report-icon"/>
                    <Link to='/reportissue'><button className="report-button">Click Here</button></Link>
                </div>
            </main>

            <footer className="footer">
                Copyright© @2024
            </footer>
        </div>
    );
};

export default Homepage;
