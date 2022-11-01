const { printTable } = require("console-table-printer");
const inquirer = require("inquirer");
const { inherits } = require("util");

//create a list of choices for the mainPage
const choices = ["View All Department", "View All Roles",
    "View All Employee", "Add A Department", "Add A Role",
    "Add An Employee", "Update An Employee Role", "ABORT | EXIT: I'm ALL DONE"];

//to be implemented ^^^
//, "Update Employee Managers",
//"View Employee By Department", "View Employee By Manager"

//view all departement
function viewAllDept(connection, init) {
    connection.query('SELECT * FROM department', (err, res) => {
        err ? console.error(err) : console.log('\n')
        console.log("use up / down to select another option")
        printTable(res);
        //adding extra space for readability of table
        console.log("==========All Department==========");
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
        console.log("==========All Roles==========");
        init();
    });
};

//view all employees
function viewAllEmp(connection, init) {
    connection.query('SELECT * FROM employee', (err, res) => {
        err ? consohle.error(err) : console.log('\n')
        console.log("use up / down to select another option")
        printTable(res);
        console.log("==========All Employee==========");
        init();
    });
};

//add a department
function addDept(connection, init) {
    const newDept = "";
    // console.log(newDept);
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
    // const newRoleName = answers.roleTitle;
    // const newSalary = answers.roleUSD;
    // const deptID = answers.deptID;
    //getting department info
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
                type: "list",
                message: "which department would this be part of?",
                name: "deptName",
                choices: function () {
                    let deptChoice = [];
                    //pushing department choice to choice array
                    res.forEach(e => deptChoice.push(e))
                    return deptChoice;
                }
            },
        ]).then((answers) => {
            // console.log(answers);
            //changing the department Name back to the ID
            connection.query('SELECT id FROM department WHERE name = ?', [answers.deptName], (err, res) => {
                let deptID = res[0].id
                // console.log(deptID);
                // console.log(res);
                //insert to table
                connection.query('INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)', [answers.roleTitle, answers.roleUSD, deptID], (err) => {
                    err ? console.log(err) : console.log(`Sucessfully added new Role titled ${answers.roleTitle}`)
                    init();
                });
            });
        });
    });
}

function addEmp(connection, init) {
    //getting roles info for choices
    connection.query('SELECT id, title FROM roles', (err, resRole) => {

        inquirer
            .prompt([
                {
                    type: "input",
                    message: "What is the new employee's First Name?",
                    name: "fName",
                },
                {
                    type: "input",
                    message: "What is their last name?",
                    name: "lName",
                },
                {
                    type: "list",
                    message: "what role is this employee hired as?",
                    name: "roleName",
                    choices: function () {
                        let roleChoice = [];
                        //pushing Role's title choice to choice array
                        console.log(resRole);
                        resRole.forEach(e => roleChoice.push(e.title))
                        return roleChoice;
                    }
                },
                {
                    type: "input",
                    message: "Please provide this employee's manager's ID? If this employee IS a manager, leave blank",
                    name: "mngrID",
                    validate(answer) {
                        if ((isNaN(answer))) {
                            return "Please make sure you provide a valid Manager ID"
                        }
                        return true
                    }
                },
            ]).then((answers) => {
                let Employee = {
                    first_name: answers.fName,
                    last_name: answers.lName,
                    roles_Name: answers.roleName,
                    manager_id: answers.mngrID,
                };
                console.log(Employee);
                //changing the roles name to ID;
                connection.query('SELECT id FROM roles WHERE title = ?', [Employee.roles_Name], (err, resRoleID) => {
                    let rolesID = resRoleID[0].id
                    // console.log(rolesID);
                    // console.log(resRoleID);
                    //if manager, manger ID = Null, but wasn't able to figrue out how to send that into the SQL Queries
                    if (isNaN(Employee.manager_id)) {
                        connection.query('INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?,?,?,NULL)', [Employee.first_name, Employee.last_name, rolesID], (err, res) => {
                            err ? console.error(err) : console.log("sucessfully added employee");
                            init();
                        })
                    } else {
                        connection.query('INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES (?,?,?,?)', [Employee.first_name, Employee.last_name, rolesID, Employee.manager_id], (err, res) => {
                            err ? console.error(err) : console.log("sucessfully added employee");
                            init();
                        })
                    }
                });
            });
    });
};

function updateEmpRole(connection, init) {
    //joining the table, and grab just the stuff we need... should have done that earlier too
    connection.query('SELECT first_name, employee.id AS EmployeeID, roles.title, roles_id AS RoleID FROM employee LEFT JOIN roles ON roles.id = employee.roles_id;', (err, respond) => {
        printTable(respond);
        console.log("===Current Employee Info===");
        connection.query('SELECT * FROM roles', (err, res) => {
            inquirer
                .prompt([
                    {
                        type: "list",
                        message: "Please choose from the following employeeID of current staff",
                        name: "employeeName",
                        choices: function () {
                            let empChoice = [];
                            console.log(respond);
                            respond.forEach(e => empChoice.push(e.EmployeeID));
                            return empChoice;
                        },
                    },
                    {
                        type: "list",
                        message: `What is new role?`,
                        name: "newRole",
                        choices: function () {
                            let roleChoice = [];
                            res.forEach(e => roleChoice.push(e.title));
                            return roleChoice;
                        }
                    },
                ]).then((answers) => {
                    connection.query('SELECT id FROM roles WHERE title = ?', [answers.newRole], (err, resRoleID) => {
                        let rolesID = resRoleID[0].id
                        connection.query('UPDATE employee SET roles_id = ? WHERE employee.id =?', [rolesID, answers.employeeName], (err, res) => {
                            err ? console.error(err) : console.log(`Employee ID ${answers.employeeName}'s role have been updated to ${answers.newRole}`);
                            init();
                        });

                    });
                });
        });
    });
};


module.exports = {
    choices, viewAllDept, viewAllEmp, viewAllRole, addDept, addRole, addEmp, updateEmpRole,
}