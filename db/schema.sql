DROP DATABASE IF EXISTS payroll_db; --makesure there are no other databases first
CREATE DATABASE payroll_db; --creating new payroll_db;

--make sure to rememebr to 
USE payroll_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    --setting department_id
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL, 
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    --setting roles_id
    PRIMARY KEY(id)
    --getting the department's unique id
    FOREIGN KEY(department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)
    FOREIGN KEY(roles_id)
    REFERENCES roles(id)
    --another reference foreign key for manager id in the same table. Not 100% if possible
    FOREIGN KEY(manager_id)
    REFERENCES employee(id)
);