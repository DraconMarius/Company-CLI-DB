const { printTable } = require("console-table-printer");

//create a list of choices for the mainPage
const choices = ["View All Department", "view all roles",
    "view all employees", "add a department", "add a role",
    "add an employee", "update an employee role", "Update employee managers", "View employeem by department"];

//view all departement
function viewAllDept(connection) {
    connection.query('SELECT * from department', (err, res) => {
        err ? console.error(err) : printTable(res);
    });
};

//view all role
function viewAllRole(connection) {
    connection.query('SELECT * from roles', (err, res) => {
        err ? console.error(err) : printTable(res);
    });
};

//view all employees
function viewAllEmp(connection) {
    connection.query('SELECT * from employee'), (err, res) => {
        err ? console.error(err) : printTable(res);
    }
}





module.exports = {
    choices, viewAllDept, viewAllEmp, viewAllRole
}