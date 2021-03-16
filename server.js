// DEPENDENCIES
const mysql = require('mysql');
const inquirer = require('inquirer');
const express = require('express');
const routes = require('./routes');

// IMPORTING CONNECTION OBJECT
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// MODELS
const Employee = require('./models/Employee');
const Department = require('./models/Department');
const Role = require('./models/Role');
const { ConnectionError } = require('sequelize/types');

// PROMPTING FUNCTION
const start = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
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
        res.forEach(({ first_name, role_id, manager_id }, i) => {
            const num = i + 1;
            console.log(
              `${num} || ${first_name} ${last_name} || Role ID: ${role_id} || Manager ID: ${manager_id}`
            );
        });
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
    });
};

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

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
    start();
});