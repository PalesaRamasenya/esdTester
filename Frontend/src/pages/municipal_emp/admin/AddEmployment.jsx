import React, { useState } from 'react';
import '../../../scss/Admin/addemployee.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faKey, faIdBadge, faPhone, faBuilding, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Forms = () => {
    const [activeForm, setActiveForm] = useState('admin');
    const navigate = useNavigate();  // Hook for navigation

    const handleFormSwitch = (formType) => {
        setActiveForm(formType);
    };

    const handleSubmit = (e, formType) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        console.log(`${formType}`)
        const token = localStorage.getItem('token');
        axios.post(`http://localhost:5000/api/auth/register/${formType}`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Form submitted successfully:', response.data);
                const message = response.data.message || "Form submitted successfully!";
                alert(message);
                navigate('/adminhome');  // Navigate to the main page after successful submission
            })
            .catch(error => {
                console.error('There was an error submitting the form!', error);
                alert('Error submitting the form. Please try again.');
            });
    };

    return (
        <div className="form-container">
            <FontAwesomeIcon
                icon={faArrowLeft}
                className="back-button"
                onClick={() => window.history.back()} // Go back to the previous page
            />
            <div className="back-button-container">
            </div>
            <nav>
                <button className='admin_button' onClick={() => handleFormSwitch('admin')}>Admin</button>
                <button className='add emoloyee_button' onClick={() => handleFormSwitch('manager')}>Add Employee</button>
            </nav>

            {activeForm === 'admin' && (
                <form  className='add_employee'  id="admin-forms" onSubmit={(e) => handleSubmit(e, 'admin')}>
                    <h2>Admin Form</h2>
                    <label htmlFor="admin-name">
                        <FontAwesomeIcon icon={faUser} /> Name:
                    </label>
                    <input type="text" id="admin-name" name="name" placeholder='Name' required />

                    <label htmlFor="admin-email">
                        <FontAwesomeIcon icon={faEnvelope} /> Email:
                    </label>
                    <input type="email" id="admin-email" name="email" placeholder='Email' required />

                    <label htmlFor="admin-password">
                        <FontAwesomeIcon icon={faKey} /> Password:
                    </label>
                    <input type="password" id="admin-password" name="password" placeholder='Password' required />
                    <button className='submit_button' type="submit">Submit</button>
                </form>
            )}

            {activeForm === 'manager' && (
                <form  className='add_employement' id="manager-form" onSubmit={(e) => handleSubmit(e, 'municipal-employer')}>
                    <h2>Add Employee</h2>
                    <label htmlFor="manager-empID">
                        <FontAwesomeIcon icon={faIdBadge} /> Employee ID:
                    </label>
                    <input type="text" id="manager-empID" name="empID" placeholder='Employee ID' required />

                    <label htmlFor="manager-name">
                        <FontAwesomeIcon icon={faUser} /> Name:
                    </label>
                    <input type="text" id="manager-name" name="name" placeholder='Name' required />

                    <label htmlFor="manager-surname">
                        <FontAwesomeIcon icon={faUser} /> Surname:
                    </label>
                    <input type="text" id="manager-surname" name="surname" placeholder='Surname' required />

                    <label htmlFor="manager-email">
                        <FontAwesomeIcon icon={faEnvelope} /> Email:
                    </label>
                    <input type="email" id="manager-email" name="email" placeholder='Email' required />

                    <label htmlFor="manager-contact">
                        <FontAwesomeIcon icon={faPhone} /> Contact:
                    </label>
                    <input type="text" id="manager-contact" name="contact" placeholder='Contact' required />

                    <label htmlFor="manager-deptID">
                        <FontAwesomeIcon icon={faBuilding} /> Department ID:
                    </label>
                    <input type="text" id="manager-deptID" name="deptID" placeholder='Department ID' required />

                    <label htmlFor="manager-deptID">Role</label>
                    <select
                        id="role"
                        name="roleCategory"
                    >
                        <option value="" disabled selected hidden>Select Role</option>
                        <option className='optiion' value="MANAGER">Manager</option>
                        <option className='optiion' value="SUPERVISOR">Supervisor</option>
                    </select>

                    <label htmlFor="manager-password">
                        <FontAwesomeIcon icon={faKey} /> Password:
                    </label>
                    <input type="password" id="manager-password" name="password" placeholder='Password' required />
                    <button  className='submit_button'type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default Forms;
