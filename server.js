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
        console.log(`${res.length} matches found!`);
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
        console.log(`${res.length} matches found!`);
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

                let query = 'INSERT INTO roles (title, salary, department_id)';
                query += `VALUES (${answer.title}, ${answer.salary}, ${deptId})`
                connection.query(query, (err, res) => {
                    console.log(
                    `Role: ${answer.title} has been created!`
                    );
                });
            });
        });
}

// addEmployee function
// ???????????????????????????????????????????????????????????
const addEmployee = () => {
    inquirer
        .prompt(
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
            let query = 'INSERT INTO employees (first_name, last_name)';
            query += `VALUES (${answer.first_name}, ${answer.last_name})`
            connection.query(query, (err, res) => {
                res.forEach(({ first_name, last_name }, i) => {
                    const num = i + 1;
                    console.log(
                    `${num} || Title: ${title} || Salary: ${salary} || Department ID: ${department_id}`
                    );
                });
            });
        });
};

connection.connect((err) => {
    if (err) throw err;
    start();
});