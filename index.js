const e = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');;
const db = require('./server');

//Starts prompMenu() when connected
db.connect(function () {
    console.log(`Connected to the empTracker database!`);
    prompMenu();
  });
  

const prompMenu = () => {
    return inquirer.prompt([
       {
            type: 'list',
            name: 'menu',
            message: 'Please select the number option you would like to continue with:',
            choices: [  '1) View all employes' , 
                        '2) Add Employee', 
                        '3) Update Employee Role', 
                        '4) View All Roles',
                        '5) Add Role',
                        '6) View All Departments',
                        '7) Add Department',
                        '8) Delete departments, roles, or employees'
                    ]
       }
    ]).then(userChoice => {
        switch (userChoice.menu) {
            case '1) View all employes':
                viewAllEmployees();
                break;
            case '2) Add Employee':
                addEmployee();
                break;
            case '3) Update Employee Role':
                updateEmployeeRole();
                break;
            case '4) View All Roles':
                viewAllRoles();
                break;
            case '5) Add Role':
                addRole();
                break;
            case '6) View All Departments':
                viewAllDepartments()
                break;
            case '7) Add Department':
                addDepartments()
                break;
            case '8) Delete departments, roles, or employees':
                deleteSomething()
                break;
            default:
            console.log('please choose an option between 1-4')
        }
    });
}


// view all employes code 
const viewAllEmployees = () => {
    console.log('Here is a list of all employees')
    db.query(`SELECT * FROM employee`, (err, results) => {
        if (err) throw err;
        console.table(results);
        prompMenu();
    });
};

// add an employee 
const addEmployee = () => {
    return inquirer.prompt([
        {
            type:'input',
            name: 'id',
            message: 'Manager ID: ',
            validate: idInput => {
            if (idInput){
                return true;
            }else {
                console.log('Please enter manager ID: ')
                return false;
                }
            }
        },
    ]).then(ans => {
        console.log(ans);

    }) 
}

// update employee role
const updateEmployeeRole = () => {
    console.log('updating employee roll');
};

// view All Roles
const viewAllRoles = () => {
    console.log('viewing all roles');
    db.query(`SELECT * FROM role`, (err, results) => {  
        if (err) throw err;
        console.table(results);
        prompMenu();
    });
}

// addRole
const addRole = () => {
    // inquirer for role name and salary
    return inquirer.prompt([
           {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role: ',
            validate: roleInput =>{
                if (roleInput){
                    return true;
                }else {
                    console.log('Enter the name of the role: ')
                    return false;
                }
            }
        },

        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for the role: ',
            validate: roleSalary =>{
                if (roleSalary){
                    return true;
                    }else {
                    console.log('Enter the salary for the role: ')
                    return false;
                }
            }
        },
     ])
    //  create new role with user input
     .then( ( { title, salary} ) => {
        console.log(title , salary);
        const newRoleInput = [title, salary];
        // create a variable for current department names in db
        const active_department = [];
        // get active department from database and add to active_department
        db.query(`SELECT * FROM department`, (err, results) => {
             results.forEach(({ departmentName , id  }) =>{
                active_department.push({
                    name: departmentName,
                    value: id,
                })
            });
            // role is to be added department 
            inquirer
            .prompt([
              {
                type: `list`,
                name: `department`,
                message: `What department does this role belong to?`,
                choices: active_department,
              },
            ])
        .then(({ department }) =>{
            // add data to newRole
            newRoleInput.push(department);
            // Insert new role into database
            db.query(
                `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, 
                newRoleInput,
                    (err, results) => {
                    if (err) throw err;
                    console.table(results);
                    // show results in table
                    viewAllRoles()
                    }
                );
            })
        });
    });
};

// viewAllDepartments
const viewAllDepartments = () => {
    console.log('viewing All Departments');
    db.query(`SELECT * FROM department`, (err, results) => {
        if (err) throw err;
        console.table(results);
        prompMenu();
    })
};

// addDepartments
const addDepartments = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Enter the name of the department: ',
            validate: departmentInput =>{
                if (departmentInput){
                    return true;
                }else {
                    console.log('Enter the name of the department: ');
                    return false;
                }
            },
        },
        
    ]).then(({ department }) => {
        db.query(
          `INSERT INTO department (departmentName) VALUES(?)`,
          department,
          function (err, results) {
            if (err) throw err;
            console.log(results);
            viewAllDepartments();
          }
        );
      });
  };

const deleteSomething = () => {
   
};