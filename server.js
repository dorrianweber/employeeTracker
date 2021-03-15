// DEPENDENCIES
const mysql = require('mysql');
const inquirer = require('inquirer');
const express = require('express');

// IMPORTING CONNECTION OBJECT
const sequelize = require('./config/connection');

// MODELS
const Employee = require('./models/Employee');
const Department = require('./models/Department');
const Role = require('./models/Role');

// PROMPTING FUNCTION
// const start = () => {

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});