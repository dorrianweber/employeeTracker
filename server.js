// TO-DO:
    // --addEmployee() function
    // --updateEmployeeRole() function
    // --Record video

// DEPENDENCIES
const mysql = require('mysql');
const inquirer = require('inquirer');

// IMPORTING CONNECTION OBJECT
const connection = require('./config/connection');

// PROMPTING FUNCTION
const start = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
              'View all employees',
              'View all departments',
              'View all roles',
              'Add an employee',
              'Add a department',
              'Add a role',
              'Update employee role',
              'Exit',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Update employee role':
                    updateEmployeeRole();
                    break;
                case 'Exit':
                    process.exit();
                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
}

// viewAllEmployees function
const viewAllEmployees = () => {
    let query = 'SELECT * FROM employees';
    connection.query(query, (err, res) => {
        console.log(`${res.length} employees found!`);
        res.forEach(({ first_name, last_name, role_id, manager_id }, i) => {
            const num = i + 1;
            console.log(
              `${num} || ${first_name} ${last_name} || Role ID: ${role_id} || Manager ID: ${manager_id}`
            );
        });
        start();
    });
};

// viewAllDepartments function
const viewAllDepartments = () => {
    let query = 'SELECT * FROM departments';
    connection.query(query, (err, res) => {
        console.log(`${res.length} matches found!`);
        res.forEach(({ name }, i) => {
            const num = i + 1;
            console.log(
              `${num} || ${name}`
            );
        });
        start();
    });
};

// viewAllRoles function
const viewAllRoles = () => {
    let query = 'SELECT * FROM roles';
    connection.query(query, (err, res) => {
        console.log(`${res.length} roles found!`);
        res.forEach(({ title, salary, department_id }, i) => {
            const num = i + 1;
            console.log(
              `${num} || Title: ${title} || Salary: ${salary} || Department ID: ${department_id}`
            );
        });
        start();
    });
};

// addRole function
const addRole = () => {
    connection.query('SELECT * FROM departments', (err, res) => {
        inquirer
            .prompt([
                {
                    name: 'title',
                    type: 'input',
                    message: `What is the name of the role?`,
                },
                
                // Add validation for number input
                {
                    name: 'salary',
                    type: 'input',
                    message: `What is the salary for this position?`,
                },

                {
                    name: 'department',
                    type: 'list',
                    message: 'To which department does this role belong?',
                    choices: res,
                }
            ])
            .then((answer) => {
                const deptIndex = res.filter((dept) => {
                    return dept.name === answer.department;
                });

                const deptId = deptIndex[0].id;

                const query = 'INSERT INTO roles SET ?';

                const roleInfo = {title: answer.title, salary: answer.salary, department_id: deptId};

                connection.query(query, roleInfo, (err, res) => {
                    console.log(`Role: ${answer.title} has been created!`);
                    start();
                });
            });
        });
};

// addEmployee function
const addEmployee = () => {
    let query = 'SELECT * FROM employees';
    connection.query(query, (err, mgr) => {
        connection.query('SELECT * FROM roles', (err, roles) => {
            console.log(roles);
            inquirer
            .prompt(

            {
                name: 'role',
                type: 'list',
                message: `What is the employee's role?`,
                choices: roles,
            },

            {
                name: 'manager',
                type: 'list',
                message: `Who is the employee's manager?`,
                choices: mgr,
            },

            {
                name: 'first_name',
                type: 'input',
                message: `What is the employee's first name?`,
            },

            {
                name: 'last_name',
                type: 'input',
                message: `What is the employee's last name?`,
            },
            
            )
            .then((answer) => {
                const rolesIndex = roles.filter((roles) => {
                    return roles.title === answer.role;
                });

                console.log(rolesIndex);

                const roleId = rolesIndex[0].id;

                const mgrIndex = mgr.filter((mgrs) => {
                    return mgrs.title === answer.manager;
                });

                const mgrId = mgrIndex[0].id;

                const query = 'INSERT INTO employees SET ?';

                const empInfo = {first_name: answer.first_name, last_name: answer.last_name, role_id: roleId, manager_id: mgrId};

                connection.query(query, empInfo, (err, res) => {
                    console.log(`${answer.first_name} ${answer.last_name} has been added!`);
                    start();
                });
            });
        });
    });
};

// addDepartment function
const addDepartment = () => {
    inquirer
        .prompt([
            {
                name: 'name',
                type: 'input',
                message: `What is the name of the department?`,
            },
        ])
        .then((answer) => {
            const query = 'INSERT INTO departments SET ?';

            const deptInfo = {name: answer.name};

            connection.query(query, deptInfo, (err, res) => {
                console.log(`Department: ${answer.name} has been created!`);
                start();
            });
        });
};

connection.connect((err) => {
    if (err) throw err;
    start();
});