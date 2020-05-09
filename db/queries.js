const connection = require("./connection");

class DB {
    // Keeping a reference to the connection on the class in case we need it later
    constructor(connection) {
        this.connection = connection;
    }

    // - - - - - - - - - - - - - - - - - - - - View Data From Database - - - - - - - - - - - - - - - - - - - - //
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

    // 1.) Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
    findAllEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    // 2.) Find all employees in a given department, join with roles to display role titles
    findAllEmployeesByDepartment(departmentId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id WHERE department.id = ?;",
            departmentId
        );
    }

    // 3.) Find all employees by manager, join with departments and roles to display titles and department names
    findAllEmployeesByManager(managerId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id WHERE manager.id = ?; ",
            managerId
        );
    }

    // 4.) Find all roles, join with departments to display the department name
    findAllRoles() {
        return this.connection.query(
            "SELECT role.title AS Role, department.name AS Department FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id"
        );
    }

    // 5.) Find all departments, join with employees and roles and sum up utilized department budget
    findAllDepartments() {
        return this.connection.query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
        );
    }

    //Find all employees except the given employee id - why is this needed??????





    // - - - - - - - - - - - - - - - - - - - - - Add Data To Database - - - - - - - - - - - - - - - - - - - - -//
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

    // Create a new employee
    createEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ?", employee);
    }

    // Create a new role

    // Create a new department




    // - - - - - - - - - - - - - - - - - - - - - Remove Data From Database - - - - - - - - - - - - - - - - - - //
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

    // Remove an employee with the given id
    removeEmployee(employeeId) {
        return this.connection.query(
            "DELETE FROM employee WHERE id = ?",
            employeeId
        );
    }

    // Remove a role from the db

    // Remove a department




    // - - - - - - - - - - - - - - - - - - - - Update Data In Database - - - - - - - - - - - - - - - - - - - - //
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - //

    // Update the given employee's role
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]
        );
    }

    // Update the given employee's manager

}


module.exports = new DB(connection);