USE payroll_db;

INSERT INTO department (name)
VALUES ('Marketing'),
       ('HR'),
       ('Engineering'),
       ('DEI');

INSERT INTO roles (title, salary, department_id)
VALUES ('Marketing Lead', 150000, 1),
       ('Marketer', 100000, 1),
       ('HR Lead', 150000, 2),
       ('Coordinator', 100000, 2),
       ('Engineering Lead', 150000, 3),
       ('SWE', 100000, 3),
       ('Diversity Lead', 150000, 4),
       ('Diversity Advocate', 100000, 4);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ('Quentin', 'Coldwater', 1, NULL),
       ('Eliot', 'Waugh', 2, 1),
       ('Julia', 'Wicker', 3, NULL),
       ('Margo', 'Hanson', 4, 3);
