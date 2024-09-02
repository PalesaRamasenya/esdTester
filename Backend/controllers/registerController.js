const bcrypt = require('bcryptjs');
const db = require('../config/db');

// exports.registerSupervisor = async (req, res) => {
//     const { empID, name, surname, email, contact, role, password } = req.body;

//     if (!empID || !name || !surname || !email || !contact || !role || !password) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//         // Check if the user already exists
//         const [userExist] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

//         if (userExist.length > 0) {
//             return res.status(409).json({ message: 'Supervisor already exists, Login instead' });
//         }

//         const roleName = 'SUPERVISOR';
//         // Get the roleID for the roleName
//         const [roleResult] = await db.query('SELECT roleID FROM roles WHERE roleName = ?', [roleName]);
//         if (roleResult.length === 0) {
//             return res.status(500).json({ message: 'Role not found' });
//         }
//         const roleID = roleResult[0].roleID;

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Insert into users table
//         await db.query(
//             'INSERT INTO users (empID, name, surname, email, contact, specialization, password, roleID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
//             [empID, name, surname, email, contact, specialization, hashedPassword, roleID]
//         );

//         res.status(201).json({ message: 'Supervisor registered successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

exports.reqgisterMunicipalEmp = async (req, res) => {
    const { empID, name, surname, email, contact, deptID, roleCategory, password } = req.body;
    
    if(!empID || !name || !surname || !email || !contact || !deptID || ! roleCategory || !password){
        return res.status(400).json({message: 'All fields are required'})
    }

    try{
        const [empExist] = await db.query('SELECT * FROM users where email = ?', [email]);

        if (empExist.length > 0) {
            return res.status(409).json({ message: 'Employee already exists.' });
        }

        const [roleResult] = await db.query('SELECT roleID FROM roles WHERE roleName = ?', [roleCategory]);
        if (roleResult.length === 0) {
            return res.status(500).json({ message: 'Role not found' });
        }
        const roleID = roleResult[0].roleID

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into users table
        await db.query(
            'INSERT INTO users (empID, name, surname, email, contact, departmentID, password, roleID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [empID, name, surname, email, contact, deptID, hashedPassword, roleID]);

            res.status(201).json({ message: 'Employee registered successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
}


// exports.registerManager = async (req, res) => {
//     const { empID, name, surname, email, contact, deptID, password } = req.body;

//     if (!empID || !name || !surname || !email || !contact || !deptID || !password) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     try {
//         // Check if the user already exists
//         const [userExist] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

//         if (userExist.length > 0) {
//             return res.status(409).json({ message: 'Manager already exists, Login instead' });
//         }

//         const roleName = 'MANAGER';
//         // Get the roleID for the roleName
//         const [roleResult] = await db.query('SELECT roleID FROM roles WHERE roleName = ?', [roleName]);
//         if (roleResult.length === 0) {
//             return res.status(500).json({ message: 'Role not found' });
//         }
//         const roleID = roleResult[0].roleID;

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Insert into users table
//         await db.query(
//             'INSERT INTO users (empID, name, surname, email, contact, departmentID, password, roleID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
//             [empID, name, surname, email, contact, deptID, hashedPassword, roleID]
//         );

//         res.status(201).json({ message: 'Manager registered successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };


exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the user already exists
        const [userExist] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (userExist.length > 0) {
            return res.status(409).json({ message: 'Admin already exists, Login instead' });
        }

        const roleName = 'ADMIN';
        // Get the roleID for the roleName
        const [roleResult] = await db.query('SELECT roleID FROM roles WHERE roleName = ?', [roleName]);
        if (roleResult.length === 0) {
            return res.status(500).json({ message: 'Role not found' });
        }
        const roleID = roleResult[0].roleID;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into users table
        await db.query(
            'INSERT INTO users (name, email, password, roleID) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, roleID]
        );

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.registerResident = async (req, res) => {
    const { name, surname, address, email, contact, password } = req.body;

    if (!name || !surname || !address || !email || !contact || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if the user already exists
        const [userExist] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (userExist.length > 0) {
            return res.status(409).json({ message: 'Resident already exists, Login instead' });
        }

        const roleName = 'RESIDENT';
        // Get the roleID for the roleName
        const [roleResult] = await db.query('SELECT roleID FROM roles WHERE roleName = ?', [roleName]);
        if (roleResult.length === 0) {
            return res.status(500).json({ message: 'Role not found' });
        }
        const roleID = roleResult[0].roleID;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into users table
        await db.query(
            'INSERT INTO users (name, surname, address, email, contact, password, roleID) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, surname, address, email, contact, hashedPassword, roleID]
        );

        res.status(201).json({ message: 'Resident registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

