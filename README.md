# Company-CLI-DB
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
###### Check out the badges hosted by [shields.io](https://shields.io/)
***
A simple commanline application that 

[Live Video Link](https://drive.google.com/file/d/1kz-yhW_2QoKaDa76LzY5Hex6a_Eef7A3/view)

***
- [X] Needs options: "view all departments", "view all roles", 
    "view all employees", "add a department",  "add a role", 
    "add an employee", and "update an employee role"
- [X] "View all departments": formatted table showing department names and department ids
- [X] "View all roles": job title, role id, the department that role belongs to, and the salary for that role
- [X] "View all employees": formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- [X] "Add a department": prompt to enter the name and that department is added to the database
- [X] "Add a role": prompt to enter the name, salary, and department for the role and that added to the database
- [X] "Add an employee": prompt to enter the employee’s first name, last name, role, and manager, and added to the database
- [X] "Update an employee role": prompted to select an employee to update and their new role and this information is updated in the database 

***
## Installation & Usage
To install and run this application, please clone / download this repository to your local machine, and **make sure you have `node.js`, `console-table-printer`, `mysql`, and `mysql2` installed!**

Please navigate to the mysql shell within your terminal, and run the following:

``` bash
mysql -u root -p (if password)

>mysql SOURCE ./db/schema.sql;
>mysql SOURCE ./db/seeds/sql;
```


The `package.json` is included in the repo, and you can run the following:

``` bash
npm i
``` 

within the repo's root directory to download all of the required depensies. 

Then you will be ready to start you application by running the following:

``` bash
node index.js
```

***
## Demo Links / Media
*(feel free to click on the gif to go to the video DEMO)*
[<img src="./Assets/demo.gif" alt='Video DEMO'>](https://drive.google.com/file/d/1kz-yhW_2QoKaDa76LzY5Hex6a_Eef7A3/view) 

## Technologies Used
> JavaScript

> node.js

> SQL

> mySQL2

> inquirer.js

## License
> MIT

***
## Contact
Feel free to contact me @ the following:

[<img src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_github_icon_143196.png" alt='github' height='40'>](https://github.com/DraconMarius) 

[<img src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_linkedin_icon_143191.png" alt='linkedin' height='40'>](https://www.linkedin.com/in/mari-ma-70771585/)  

[Icon credit @ Anton Kalashnyk](https://icon-icons.com/users/14quJ7FM9cYdQZHidnZoM/icon-sets/)
