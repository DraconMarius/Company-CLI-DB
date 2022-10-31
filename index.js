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

function init() {
    inquirer
        .prompt([
            {
                type: "list",
                message: intro,
                choices: choices,
                name: "chosen",
            },
        ]).then((answers) => {
            console.log(answers.chosen);
            // console.log(choices[10]);
            const chosen = answers.chosen;

            //added a end program option
            if (chosen === choices[10]) {
                console.log("Thank you and visit again", '\n', 'Use Ctrl-C to end the program');
                return;
            } else if (chosen !== choices[10]) {
                selectedOption(answers);
            }
        });
};

//swithc statement that depends on chosen option in init
function selectedOption(answers) {
    switch (answers.chosen) {
        case choices[0]:
            viewAllDept(connection);
            init();
            break;
        case choices[1]:
            viewAllRole(connection);
            init();
            break;
        case choices[2]:
            viewAllEmp(connection);
            init();
            break;
        case choices[3]:
            addDept(connection);
            init();
            break;
        case choices[4]:
            init();
            break;
        case choices[5]:
            addEmp(connection, answers);
            init();
            break;
        case choices[6]:
            updateEmpRole(connection, answers);
            init();
            break;
        case choices[7]:
            updateEmpMngr(connection, answers);
            init();
            break;
        case choices[8]:
            viewEmpByDept(connection, answers);
            init();
            break;
        case choices[9]:
            viewEmpByMngr(connection, answers);
            init();
            break;
    };
};

init();
