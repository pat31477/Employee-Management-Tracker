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