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
                        '8) Delete departments, roles, or employees',
                        '9) Exit'
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
            case '9) Exit':
                exit();
                break; 
            default:
            console.log('please choose an option ')
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
            name: 'firstName',
            message: 'Enter First Name: ',
            validate: firstNameInput => {
            if (firstNameInput){
                return true;
            }else {
                console.log('Enter First Name: ')
                return false;
                }
            }
        },
        {
            type:'input',
            name: 'lastName',
            message: 'Enter Last Name: ',
            validate: lastNameInput => {
                if (lastNameInput){
                    return true;
                }else {
                    console.log('Enter Last Name: ')
                    return false;
                    }
            }
        },

    ]).then(({firstName ,lastName}) => {
        const newEmployee = [firstName, lastName];
        db.query(`SELECT * FROM role`, (err, results) => {
            if(err) throw err;
            const activeRoles = [];
            results.forEach(({title, id}) => {
                activeRoles.push({
                    name: title,
                    value: id
                });
            });
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: 'Select which role your employee will be added to:',
                    choices: activeRoles,
                },
            ]).then(({role}) => {
                newEmployee.push(role);
                console.log(newEmployee);

                db.query(`SELECT * FROM EMPLOYEE`, (err, results) => {
                    if(err) throw err;
                    const managers = [
                        {
                            name: 'None',
                            value: null,
                        },
                    ];
                    results.forEach(({ id , first_name, last_name}) => {
                        managers.push({
                            name:`${first_name} ${last_name}`,
                            value: id,
                        });
                    });
                    inquirer.prompt([
                        {
                            type: 'list', 
                            name:'manager',
                            message: 'Select which manager your employee will be added to:',
                            choices: managers,
                        }
                        ]).then(({manager}) => {
                        newEmployee.push(manager);

                        db.query(
                            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`,
                            newEmployee,
                            (err, results) => {
                              if (err) throw err;
                              console.log(results);
                              console.log(`The employee has been successfully added!`);
                              viewAllEmployees();
                            }
                        );
                    })
                })
            });
        });
    }) 
}

// update employee role
const updateEmployeeRole = () => {
    db.query(`SELECT * FROM employee`, (err, results) => {
        if (err) throw err;
        const listOfEmployees = [];
        results.forEach(({id, first_name, last_name , role_id}) => {
            listOfEmployees.push({
                name: `${first_name} ${last_name}`,
                value: id ,
            });
        });
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Select employee to update: ',
                choices: listOfEmployees,
            },
        ]).then(({employee}) => {
            let employeeID = employee;
            console.log(employeeID);
            
            db.query('SELECT * FROM role', (err, results) => {
                if (err) throw err;
                const active_rolls = [];
                results.forEach(({title, id}) => {
                    active_rolls.push({
                        name: title,
                        value: id,
                    });
                });
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'newRoll',
                        message: 'Select employees new roll: ',
                        choices: active_rolls,
                    }, 
                ]).then(({newRoll}) => {
                    console.log(newRoll);
                    console.log(employeeID);

                    db.query(
                        `UPDATE employee SET role_id = ${newRoll} WHERE id=${employeeID}`, 
                        (err, results) => {
                            console.log(results);
                            viewAllEmployees();
                        }
                    );
                });
            });
        });
    });
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
  
const exit = () => {
    console.log('GoodBye!')
}

const deleteSomething = () => {
   
};