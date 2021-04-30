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

async function viewEmployeesByManager(){
    let managers;
    let managerList;

    await myBLL.getAllManagerNames()
    .then(res=>{
        managers = res; 
        managerList = managers.map(e => e.name);                    
        managerList.push("Cancel");                        
    });           
                 
    await inquirer.prompt({
        message:"Choose a manager:",
        type: "list",
        choices: managerList,
        name: "choice"
    }).then(async function(answer){
        switch (answer.choice){
        case "Cancel":
            //go back to previous menu
            break;
        default:
            //get the right manager from the list
            manager = managers.find(e => e.name === answer.choice);
            await myBLL.getEmployeesByManager(manager).then(res=>{
                dispayResults(res);
            });
            break;
        }
        
    });
    loadMainMenu();
}

async function viewAllRoles(){
    await myBLL.viewAllRoles()
    .then(res =>{
        dispayResults(res);
    });
    loadMainMenu();
}

async function viewAllDepartments(){
    await myBLL.getAllDepartments()
    .then(res=>{
        dispayResults(res);
    });
    loadMainMenu();
}

async function getAllEmployeesFullData(){
    await myBLL.getAllEmployeesFullData()
    .then(res =>{
        dispayResults(res);
    });
    loadMainMenu();
}

async function addDepartment(){
    
    await inquirer.prompt(questions.addDepartment)
    .then(async function(answer){        
        await myBLL.addDepartment(answer.department)
        .then(res=>{
            console.log(`New Department ID: ${res}`);
        });
    });
    
    loadMainMenu();

}

async function addRole(){
    let q = questions.addRole;
    let departments;
    let departmentNames;
    
    await myBLL.getAllDepartments().then(res=>{
        departmentNames = res.map(e=>e.name);
        departments = res;
    });

    //set the list of choices
    q.find(e=>e.name === "department").choices = departmentNames;
    q.find(e=>e.name === "department").pageSize = departmentNames.length;

    await inquirer.prompt(q)
    .then(async function(answers){
        
        let role = {
            title: answers.title,
            salary: answers.salary,
            department_id: departments.find(e=>e.name === answers.department).id
        };

        await myBLL.addRole(role)
        .then(res=>{
            console.log(res);
        });

    });
    
    loadMainMenu();
}