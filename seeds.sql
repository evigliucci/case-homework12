/* Seeds for SQL table. We haven't discussed this type of file yet */
USE employeeTracker;

INSERT INTO departments (id, name)
VALUES (1, "marketing");

INSERT INTO departments (id, name)
VALUES (2, "it");

INSERT INTO departments (id, name)
VALUES (3, "sales");

INSERT INTO departments (id, name)
VALUES (4, "design");


INSERT INTO roles (id, title, salary, department_id)
VALUES ("1", "copywriter", "54000", "1");

INSERT INTO roles (id, title, salary, department_id)
VALUES ("2", "developer", "86000", "2");

INSERT INTO roles (id, title, salary, department_id)
VALUES ("3", "sales-rep", "102500", "3");

INSERT INTO roles (id, title, salary, department_id)
VALUES ("4", "designer", "63700", "4");



INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("1", "sarah", "dravec", "1", NULL);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("2", "austin", "valle", "2", "5");

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("3", "kevin", "kranek", "3", NULL);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("4", "keith", "pishnery", "4", NULL);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("5", "duane", "hall", "2", NULL);
