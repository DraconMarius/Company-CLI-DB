const { printTable } = require("console-table-printer");
const inquirer = require("inquirer");

//create a list of choices for the mainPage
const choices = ["View All Department", "View All Roles",
    "View All Employee", "Add A Department", "Add A Role",
    "Add An Employee", "Update An Employee Role", "Update Employee Managers",
    "View Employee By Department", "View Employee By Manager", "ABORT | EXIT: I'm ALL DONE"];

//view all departement
function viewAllDept(connection) {
    connection.query('SELECT * FROM department', (err, res) => {
        err ? console.error(err) : console.log('\n')
        console.log("use up / down to select another option")
        printTable(res);
        //adding extra space for readability of table
        res.forEach(r => console.log('\n'));
    });
    return;
};

//view all role
function viewAllRole(connection) {
    connection.query('SELECT * FROM roles', (err, res) => {
        err ? console.error(err) : console.log('\n')
        console.log("use up / down to select another option")
        printTable(res);
        res.forEach(r => console.log('\n'));
    });
    return;
};

//view all employees
function viewAllEmp(connection) {
    connection.query('SELECT * FROM employee', (err, res) => {
        err ? consohle.error(err) : console.log('\n')
        console.log("use up / down to select another option")
        printTable(res);
        res.forEach(r => console.log('\n'));
    });
    return;
};

//add a department
function addDept(connection) {
    const currentDept = {};
    connection.query('SELECT * FROM department', (err, res) => {
        err ? console.error(err) : console.log('\n', 'list of department and Department ID')
        printTable(res);
        res.forEach(dept => console.log('\n'));
        // const key = res;
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What do you want to call the new department?",
                    name: "deptName",
                    //validate answer, cannot be null // already exit using some method
                    validate(answer) {
                        let key = res;
                        if (!answer || (key.some(dept => dept.Name === answer.deptName))) {
                            return "Your Department name cannot be blank or already exists in db"
                        }
                        return true
                    },
                },
            ]).then((answers) => { //using prepared statements to insert a new dept with name
                connection.query('INSERT INTO department (name) VALUES(?)', [answers.deptName], (err) => {
                    err ? console.error(err) : console.log("Sucessfully added new Department");
                });
            });
    });
}




module.exports = {
    choices, viewAllDept, viewAllEmp, viewAllRole, addDept,
}