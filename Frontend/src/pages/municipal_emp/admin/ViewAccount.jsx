import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faKey, faIdBadge, faPhone, faBuilding, faBriefcase, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
//import '../../../scss/Admin/addemployee.scss';
//import '../../../scss/Admin/superviserlist.scss';
//import '../../../scss/Admin/managerlist.scss';
import '../../../scss/Admin/viewaccount.scss';
//import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const initialSupervisors = [
  { name: "Khanyisile Mthombeni", email: "khanyisileM@gmail.com" },
  { name: "Nkosinathi Mokwena", email: "nkosinathiM@gmail.com" },
  { name: "Ayanda Mthethwa", email: "ayandaM@gmail.com" },
  { name: "Alvin", email: "alvin@gmail.com" },
  { name: "Senzo Khumalo", email: "senzoK@gmail.com" },
];

const initialManagers = [
  { name: "Thandeka Nkadimeng", email: "thandekaN@gmail.com" },
  { name: "Palesa Ramasenya", email: "palesaR@gmail.com" },
  { name: "Dennis Ramara", email: "dennisR@gmail.com" },
  { name: "Phumudzo", email: "phumudzo@gmail.com" },
  { name: "Mdeva", email: "mdeva@gmail.com" },
];

const Forms = () => {
    const [activeForm, setActiveForm] = useState('manager');
    const [supervisors, setSupervisors] = useState(initialSupervisors);
    const [managers, setManagers] = useState(initialManagers);
    const [searchTerm, setSearchTerm] = useState("");
    
    const handleFormSwitch = (formType) => {
        setActiveForm(formType);
    };

    const handleSubmit = (e, formType) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        console.log(`${formType}`);
        const token = localStorage.getItem('token');
        axios.post(`http://localhost:5000/api/auth/register/${formType}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Form submitted successfully:', response.data);
                alert(response.data.message);
            })
            .catch(error => {
                console.error('There was an error submitting the form!', error);
            });
    };

    const handleDeleteSupervisor = (email) => {
        setSupervisors(supervisors.filter((supervisor) => supervisor.email !== email));
    };

    const handleDeleteManager = (email) => {
        setManagers(managers.filter((manager) => manager.email !== email));
    };

    const filteredSupervisors = supervisors.filter((supervisor) =>
        supervisor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredManagers = managers.filter((manager) =>
        manager.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="form-container">
              <FontAwesomeIcon
          icon={faArrowLeft}
          className="back-button"
          onClick={() => window.history.back()} // Go back to the previous page
        />
            <nav>
                
                <button onClick={() => handleFormSwitch('manager')}>Manager</button>
                <button onClick={() => handleFormSwitch('supervisor')}>Supervisor</button>
            </nav>


            {activeForm === 'manager' && (
                <>
                    
                    <section className="managers-list">
                        <h2>Managers List</h2>
                        <input
                            type="text"
                            placeholder="Search Manager"
                            className="search-bar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {filteredManagers.map((manager) => (
                            <div className="manager-card" key={manager.email}>
                                <div className="manager-info">
                                    <span className="manager-name">{manager.name}</span>
                                    <span className="manager-email">{manager.email}</span>
                                </div>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteManager(manager.email)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </section>
                </>
            )}

            {activeForm === 'supervisor' && (
                <>
                    
                    <section className="supervisors-list">
                        <h2>Supervisors List</h2>
                        <input
                            type="text"
                            placeholder="Search Supervisor"
                            className="search-bar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {filteredSupervisors.map((supervisor) => (
                            <div className="supervisor-card" key={supervisor.email}>
                                <div className="supervisor-info">
                                    <span className="supervisor-name">{supervisor.name}</span>
                                    <span className="supervisor-email">{supervisor.email}</span>
                                </div>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteSupervisor(supervisor.email)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </section>
                </>
            )}
        </div>
    );
};

export default Forms;
