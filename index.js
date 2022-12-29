const inquirer = require('inquirer');


const prompMenu = () => {
    return inquirer.prompt([
       {
            type: 'list',
            name: 'menu',
            message: 'Please select the number option you would like to continue with:',
            choices: [  '1) View All Employees' , 
                        '2) Add Employee', 
                        '3) Update Employee Role', 
                        '4) View All Roles',
                        '5) Add Role',
                        '6) View All Departments',
                        '7) Add Department']
       }])
       .then(userChoice => {
        switch (userChoice.menu) {
            case '1) View All Employees':
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
            case '7) View All Departments':
                addDepartments()
            break;
            default:
            console.log('please choose an option between 1-4')
        }
    });
}
prompMenu();

// view all employes code 
const viewAllEmployees = () => {
    console.log('List of emp');
}

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
};


// addRole
const addRole = () => {
    console.log('adding Roll');
};


// viewAllDepartments
const viewAllDepartments = () => {
    console.log('viewing All Departments');
};


// addDepartments
const addDepartments = () => {
    console.log('adding Department');
};