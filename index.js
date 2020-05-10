const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db/queries");
require("console.table");

init();

// Display logo text, load main prompts
function init() {
    const logoText = logo({ name: "Employee Manager" }).render();

    console.log(logoText);

    loadMainPrompts();
}

// - - - - - - PROMPTS SECTION - - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - //
async function loadMainPrompts() {
    const {
        choice
    } = await prompt([{
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [{
            name: "View All Employees",
            value: "VIEW_EMPLOYEES"
        }, {
            name: "View All Employees By Department",
            value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
        }, {
            name: "View All Employees By Manager",
            value: "VIEW_EMPLOYEES_BY_MANAGER"
        }, {
            name: "View All Roles",
            value: "VIEW_ROLES"
        }, {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS"
        }, {
            name: "Add Employee",
            value: "ADD_EMPLOYEE"
        }, {
            name: "Add Role",
            value: "ADD_ROLE"
        }, {
            name: "Add Department",
            value: "ADD_DEPARTMENT"
        }, {
            name: "Remove Employee",
            value: "REMOVE_EMPLOYEE"
        }, {
            name: "Remove Role",
            value: "REMOVE_ROLE"
        }, {
            name: "Remove Department",
            value: "REMOVE_DEPARTMENT"
        }, {
            name: "Update Employee Role",
            value: "UPDATE_EMPLOYEE_ROLE"
        }, {
            name: "Update Employee Manager",
            value: "UPDATE_EMPLOYEE_MANAGER"
        }, {
            name: "Quit",
            value: "QUIT"
        }]
    }]);

    // Call the appropriate function depending on what the user chose
    switch (choice) {
        case "VIEW_EMPLOYEES":
            return viewEmployees();
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
            return viewEmployeesByDepartment();
        case "VIEW_EMPLOYEES_BY_MANAGER":
            return viewEmployeesByManager();
        case "VIEW_ROLES":
            return viewRoles();
        case "VIEW_DEPARTMENTS":
            return viewDepartments();
        case "ADD_EMPLOYEE":
            return addEmployee();
        case "ADD_ROLE":
            return addRole();
        case "ADD_DEPARTMENT":
            return addDepartment();
        case "REMOVE_EMPLOYEE":
            return removeEmployee();
        case "REMOVE_ROLE":
            return removeRole();
        case "REMOVE_DEPARTMENT":
            return removeDepartment();
        case "UPDATE_EMPLOYEE_ROLE":
            return updateEmployeeRole();
        case "UPDATE_EMPLOYEE_MANAGER":
            return updateEmployeeManager();
        default:
            return quit();
    }
}

// - - - - - - VIEW DATA SECTION - - - - - - //
// - - - - - - - - - - - - - - - - - - - - - //
async function viewEmployees() {
    const employees = await db.findAllEmployees();

    console.log("\n");
    console.table(employees);

    loadMainPrompts();
}

async function viewEmployeesByDepartment() {
    const departments = await db.findAllEmployees();

    const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));

    const { departmentId } = await prompt({
        type: "list",
        name: "departmentId",
        message: "Which departemnt would you like to see employees for?",
        choices: departmentChoices
    });

    const employees = await db.findAllEmployeesByDepartment(departmentId);

    console.log("\n");
    console.table(employees);

    loadMainPrompts();
}

async function viewEmployeesByManager() {
    const managers = await db.findAllEmployees();

    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { managerId } = await prompt({
        type: "list",
        name: "managerId",
        message: "Which manager would you like to see direct reports for?",
        choices: managerChoices
    });

    const employees = await db.findAllEmployeesByManager(managerId);

    console.log("\n");
    console.table(employees);

    loadMainPrompts();
}

async function viewRoles() {
    const roles = await db.findAllRoles();

    console.log("\n");
    console.table(roles);

    loadMainPrompts();
}

async function viewDepartments() {
    const departments = await db.findAllDepartments();

    console.log("\n");
    console.table(departments);

    loadMainPrompts();
}

// - - - - - - ADD DATA SECTION - - - - - - -//
// - - - - - - - - - - - - - - - - - - - - - //
async function addEmployee() {
    const roles = await db.findAllRoles();
    const employees = await db.findAllEmployees();

    const employee = await prompt([{
            name: "first_name",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            message: "What is the employee's last name?"
        }
    ]);

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));


    const { roleId } = await prompt({
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roleChoices
    });

    employee.role_id = roleId;

    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    managerChoices.unshift({ name: "None", value: null });

    const { managerId } = await prompt({
        type: "list",
        name: "managerId",
        message: "Who is the employee's manager?",
        choices: managerChoices
    });

    employee.manager_id = managerId;

    await db.createEmployee(employee);

    console.log(
        `Added ${employee.first_name} ${employee.last_name} to the database`
    );

    loadMainPrompts();
}

async function addRole() {
    const departments = await db.findAllDepartments();

    const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }))

    const role = await prompt([{
            name: 'title',
            message: "What is the title of the new Role?"
        },
        {
            name: 'salary',
            message: "What is the salary of the new Role?"
        },
        {
            type: 'list',
            name: "department_id",
            message: 'Which department is the new role a part of?',
            choices: departmentChoices
        }
    ]);

    await db.createRole(role);

    console.log(`You have added ${role.title} to the list of roles`);

    loadMainPrompts();
}

async function addDepartment() {
    const department = await prompt([{
        name: name,
        message: "what is the name of the new department."
    }]);

    awaitdb.createDepartment(department);

    console.log(`You have added ${department.name} to your list of departments`);

    loadMainPrompts();
}

// - - - - - - REMOVE DATA SECTION - - - - - //
// - - - - - - - - - - - - - - - - - - - - - //
async function removeEmployee() {
    const employees = await db.findAllEmployees();

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { employeeId } = await prompt([{
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: employeeChoices
    }]);

    await db.removeEmployee(employeeId);

    console.log("Removed employee from the database");

    loadMainPrompts();
}

async function removeRole() {

}

async function removeDepartment() {

}

// - - - - - - UPDATE DATA SECTION - - - - - //
// - - - - - - - - - - - - - - - - - - - - - //
async function updateEmployeeRole() {
    const employees = await db.findAllEmployees();

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { employeeId } = await prompt([{
        type: "list",
        name: "employeeId",
        message: "Which employee's role do you want to update?",
        choices: employeeChoices
    }]);

    const roles = await db.findAllRoles();

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await prompt([{
        type: "list",
        name: "roleId",
        message: "Which role do you want to assign the selected employee?",
        choices: roleChoices
    }]);

    await db.updateEmployeeRole(employeeId, roleId);

    console.log("Updated employee's role");

    loadMainPrompts();
}
async function updateEmployeeManager() {

}
// - - - - - - QUIT APP SECTION - - - - - - -//
// - - - - - - - - - - - - - - - - - - - - - //
function quit() {
    console.log("Goodbye!");
    process.exit();
}