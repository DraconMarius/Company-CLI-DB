const { printTable } = require("console-table-printer");
const inquirer = require("inquirer");
const { inherits } = require("util");

//create a list of choices for the mainPage
const choices = ["View All Department", "View All Roles",
    "View All Employee", "Add A Department", "Add A Role",
    "Add An Employee", "Update An Employee Role", "Update Employee Managers",
    "View Employee By Department", "View Employee By Manager", "ABORT | EXIT: I'm ALL DONE"];

//view all departement
function viewAllDept(connection, init) {
    connection.query('SELECT * FROM department', (err, res) => {
        err ? console.error(err) : console.log('\n')
        console.log("use up / down to select another option")
        printTable(res);
        //adding extra space for readability of table
        console.log("==========", "\n", "==========");
        init();
    });
    return;
};

//view all role
function viewAllRole(connection, init) {
    connection.query('SELECT * FROM roles', (err, res) => {
        err ? console.error(err) : console.log('\n')
        console.log("use up / down to select another option")
        printTable(res);
        console.log("==========", "\n", "==========");
        init();
    });
};

//view all employees
function viewAllEmp(connection, init) {
    connection.query('SELECT * FROM employee', (err, res) => {
        err ? consohle.error(err) : console.log('\n')
        console.log("use up / down to select another option")
        printTable(res);
        console.log("==========", "\n", "==========");
        init();
    });
};

//add a department
function addDept(connection, init) {
    const newDept = "";
    console.log(newDept);
    connection.query('SELECT name FROM department', (err, res) => {
        inquirer.prompt([
            {
                type: "input",
                message: "What do you want to call the new department?",
                name: "deptName",
                validate(answer) {
                    if (!answer || res.some(r => r.name === answer)) {
                        return "Your Department name cannot be blank or already exists"
                    }
                    return true
                }
            },
        ]).then((answers) => {
            connection.query('INSERT INTO department (name) VALUES(?)', [answers.deptName], (err) => {
                err ? console.log(err) : console.log(`Sucessfully added new Department ${newDept}`);
                init()
            });
        });
    });
};

//add a role 
function addRole(connection, init) {
    const newRoleName = answers.roleTitle;
    const newSalary = answers.roleUSD;
    const deptID = answers.deptID;
    connection.query('SELECT * FROM department', (err, res) => {
        inquirer.prompt([
            {
                type: "input",
                message: "What do you want to call the new position",
                name: "roleTitle",
                validate(answer) {
                    if (!answer) {
                        return "Your new role's name cannot be blank"
                    }
                    return true
                }
            },
            {
                type: "input",
                message: "What would be the salary for this new role in USD?",
                name: "roleUSD",
                validate(answer) {
                    if (!answer || (isNaN(answer))) {
                        return "Your Department name cannot be blank && a valid number"
                    }
                    return true
                }
            },
            {

            },
        ]).then((answers) => {
            connection.query('INSERT INTO roles (title, salary, department_id VALUES (?,?,?)', [newRoleName, newSalary, deptID], (err) => {
                err ? console.log(err) : console.log(`Sucessfully added new Role titled ${newRoleName}`)
                init();
            });
        });
    });
}


module.exports = {
    choices, viewAllDept, viewAllEmp, viewAllRole, addDept,
}