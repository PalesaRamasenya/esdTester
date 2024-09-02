const db = require('../config/db');

const reportIssue = async (req, res) => {
    const { location, description, issueCategory } = req.body;
    const image = req.file;
    const imagePath = `/uploads/${image.filename}`;

    const residentID = req.user.id; // Get the user ID from the authenticated token
  console.log(location +' ' + description + ' ' + issueCategory);
    if (!location || !description || !issueCategory) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Insert the new issue into the database, including the issueCategory
        await db.query(
            'INSERT INTO issue (residentID, location, description, status, dateReported, issueCategory, issue_image_path) VALUES (?, ?, ?, ?, NOW(), ?, ?)',
            [residentID, location, description, 'Pending', issueCategory, imagePath]
        );

        res.status(201).json({ message: 'Issue reported successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getIssuesByResidentID = async (req, res) => {
    const residentID = req.user.id; // Get the user ID from the authenticated token

    try {
        // Select issues based on the residentID
        const [issues] = await db.query(
            'SELECT * FROM issue WHERE residentID = ? ORDER BY dateReported DESC',
            [residentID]
        );

        // No need to return 404 if no issues are found; instead, return an empty array
        res.status(200).json(issues);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getIssuesByDeptID = async (req, res) => {
    const deptID = req.user.departmentID; // Assuming the departmentID is stored in the user's token

    try {
        let issues;

        if (deptID) {
            // Retrieve the department name based on the departmentID
            const [dept] = await db.query(
                'SELECT dept_name FROM department WHERE deptID = ?',
                [deptID]
            );

            let deptName = dept.length > 0 ? dept[0].dept_name.toLowerCase() : null;

            // Select issues where the issueCategory matches the department name or is "Other"
            [issues] = await db.query(`SELECT *
                 FROM issue 
                 WHERE (issueCategory = ? OR issueCategory = ?)
                 ORDER BY dateReported DESC`,
                [deptName, 'Other']
            );
        } else {
            return res.status(400).json({ message: 'Department ID is missing' });
        }

        if (issues.length === 0) {
            return res.status(404).json({ message: 'No issues found for this department' });
        }
        res.status(200).json(issues);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllIssues = async (req, res) => {
    try {
        // Retrieve all issues from the database, ordered by the date reported
        const [issues] = await db.query('SELECT * FROM issue ORDER BY dateReported DESC');

        // Return the issues in the response
        res.status(200).json(issues);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getIssueReporter = async (req, res) => {
        const reporterID = req.params.id;

        try{
            const [user] = await db.query('SELECT name AS name, surname AS surname FROM users WHERE id = ?', [reporterID]);

            res.status(200).json(user[0]);
        }catch(error){
            console.log(error);
            res.status(500).json({message: 'Internal server error'})
        }
}
module.exports = { getIssueReporter, reportIssue, getIssuesByResidentID, getIssuesByDeptID, getAllIssues };

