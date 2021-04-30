//load dependencies 
const BLL = require('./lib/BLL');
const mysql = require('mysql');
const cTable = require('console.table');
const inquirer = require('inquirer');
const Questions = require('./lib/questions');

const myBLL = new BLL();
const questions = new Questions();

//welcome message and "loader"
function welcome(){
    console.log("Welcome to Employee Tracker");
    console.log("Loading");
    
    let duration = 0;
    let time = 250;
    let endTime = 1500;   

    let interval = setInterval(()=>{
        process.stdout.write('.');
        duration += time;
        if(duration == endTime ){
            clearInterval(interval);
        }
    }, time);
    setTimeout(() => {
        process.stdout.write('\033c');
        loadMainMenu();       
    }, endTime); 
}
//core application loop:
async function loadMainMenu(){

    await inquirer.prompt(questions.mainMenu)
    .then(async function(answers){
        switch(answers.choice){
            case "View All Employees":
                await getAllEmployeesFullData();                
                break;
            case "View Departments":
                await viewAllDepartments();                
                break;
            case "View Roles":
                await viewAllRoles();                
                break;
            case "View employees by Manager":
                await viewEmployeesByManager();
                break;
            case "Add a Department":
                await addDepartment();
                break;
            case "Add a Role":
                await addRole();
                break;
            case "Update Employee Role":
                await updateEmployeeRole();
                break;
            case "Add an Employee":
                await addEmployee();
                break;
            case "Quit":     
                break;
            default:
                break;
        }            
    });    
}