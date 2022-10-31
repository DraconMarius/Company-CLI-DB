/*
- [X] Needs options: "view all departments", "view all roles", 
    "view all employees", "add a department",  "add a role", 
    "add an employee", and "update an employee role"
- [X] "View all departments": formatted table showing department names and department ids
- [X] "View all roles": job title, role id, the department that role belongs to, and the salary for that role
- [X] "View all employees": formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- [ ] "Add a department": prompt to enter the name and that department is added to the database
- [ ] "Add a role": prompt to enter the name, salary, and department for the role and that added to the database
- [ ] "Add an employee": prompt to enter the employee’s first name, last name, role, and manager, and added to the database
- [ ] "Update an employee role": prompted to select an employee to update and their new role and this information is updated in the database 
BONUS
- [ ] "Update employee managers"
- [ ] "View employees by manager"
- [ ] "View employees by department"
- [ ] "Delete departments, roles, and employees"
- [ ] View the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.

*/


const inquirer = require('inquirer');
const mysql = require('mysql2');
const { printTable } = require('console-table-printer');
//importing from lib
const { choices, viewAllDept, viewAllEmp, viewAllRole, addDept } = require("./lib/QandA");
const intro = "select the following:";


//connecting to the mySQL server, please edit line 31 to provide a specific password
//or put "" if no password defined;
//more more info: https://www.npmjs.com/package/mysql2
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'payroll_db',
},
    console.log('Connected to payroll_db ')
);

//originally wanted to get current payroll info for validation reasons;
// let depts = [];
// let roles = [];
// let employees = [];
// let mngrs = [];

// connection.query('SELECT * FROM department', (err, res) => {
//     err ? console.error(err) : res.forEach((e) => {
//         depts.push(e);
//     });
// });
// // console.log(depts);

// connection.query('SELECT * FROM roles', (err, res) => {
//     err ? console.error(err) : res.forEach((e) => {
//         roles.push(e);
//     });
// });
// // console.log(roles);


// connection.query('SELECT * FROM employee WHERE manager_id IS NOT NULL', (err, res) => {
//     err ? console.error(err) : res.forEach((e) => {
//         employees.push(e);
//     });
// });
// // console.log(employees);

// connection.query('SELECT * FROM employee ', (err, res) => {
//     err ? console.error(err) : res.forEach((e) => {
//         mngrs.push(e);
//     });
// });
// console.log(mngrs);

function init() {
    inquirer
        .prompt([
            {
                type: "list",
                message: intro,
                choices: choices,
                name: "chosen",
            },
            // {
            //     type: "input",
            //     message: "What do you want to call the new department?",
            //     name: "deptName",
            //     when: (answers) => {
            //         if (answers.chosen === choices[3]) {
            //             return true;
            //         }
            //     },
            //     validate(answer) {
            //         if (!answer) {
            //             return "Your Department name cannot be blank"
            //         }
            //         return true
            //     }
            // },
            // {
            //     type: "input",
            //     message: "What do you want to call the new position",
            //     name: "roleTitle",
            //     when: (answers) => {
            //         if (answers.chosen === choices[4]) {
            //             return true;
            //         }
            //     },
            //     validate(answer) {
            //         if (!answer) {
            //             return "Your new role's name cannot be blank"
            //         }
            //         return true
            //     }
            // },
            // {
            //     type: "input",
            //     message: "What would be the salary for this new role in USD?",
            //     name: "roleUSD",
            //     when: (answers) => {
            //         if (answers.chosen === choices[4]) {
            //             return true;
            //         }
            //     },
            //     validate(answer) {
            //         if (!answer || (isNaN(answer))) {
            //             return "Your Department name cannot be blank && a valid number"
            //         }
            //         return true
            //     }
            // },
        ]).then((answers) => {
            console.log(answers.chosen);
            // console.log(choices[10]);
            const chosen = answers.chosen;
            console.log(answers.deptName);
            // inquirer.prompt.ui.close();
            // return ("test1");
            // added a end program option
            if (chosen === choices[10]) {
                console.log("Thank you and visit again", '\n', 'Use Ctrl-C to end the program');
                return;
            } else if (chosen !== choices[10]) {
                selectedOption(connection, answers);
            };
        });
};

//swithc statement that depends on chosen option in init
function selectedOption(connection, answers) {
    switch (answers.chosen) {
        case choices[0]:
            viewAllDept(connection);
            break;
        case choices[1]:
            viewAllRole(connection);
            break;
        case choices[2]:
            viewAllEmp(connection);
            break;
        case choices[3]:
            addDept(connection, init);
            break;
        case choices[4]:
            addRole(connection);
            break;
        case choices[5]:
            addEmp(connection, answers);
            break;
        case choices[6]:
            updateEmpRole(connection, answers);
            break;
        case choices[7]:
            updateEmpMngr(connection, answers);
            break;
        case choices[8]:
            viewEmpByDept(connection, answers);
            break;
        case choices[9]:
            viewEmpByMngr(connection, answers);
            break;
    };
};

init();
