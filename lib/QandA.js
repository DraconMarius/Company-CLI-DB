const { printTable } = require("console-table-printer");

//create a list of choices for the mainPage
const choices = ["View All Department", "View All Roles",
    "View All Employee", "Add A Department", "Add A Role",
    "Add An Employee", "Update An Employee Role", "Update Employee Managers", "View Employeem By Department", "ABORT | EXIT: I'm ALL DONE"];

//view all departement
function viewAllDept(connection) {
    connection.query('SELECT * FROM department', (err, res) => {
        err ? console.error(err) : console.log('\n')
        console.log("use up / down to select another option")
        printTable(res);
    });
};

//view all role
function viewAllRole(connection) {
    connection.query('SELECT * FROM roles', (err, res) => {
        err ? console.error(err) : console.log('\n')
        console.log("use up / down to select another option")
        printTable(res);
    });
};

//view all employees
function viewAllEmp(connection) {
    connection.query('SELECT * FROM employee', (err, res) => {
        err ? console.error(err) : console.log('\n')
        console.log("use up / down to select another option")
        printTable(res);
    });
};





module.exports = {
    choices, viewAllDept, viewAllEmp, viewAllRole
}