class Questions{
    get mainMenu(){
        let choices = ["View All Employees",
        "View Departments",
        "View Roles",
        "Update Employee Role",
        "View employees by Manager",
        "Add an Employee",
        "Add a Department",
        "Add a Role",
        "Quit"];
        return {
            type:"list",
            message:"Main Menu:",
            choices: choices,
            name:"choice",
            pageSize: choices.length 
        };
    }
    get addDepartment(){
        return {
            type: "input",
            message: "Please enter department name.",
            name:"department"
        };
    }
    get addRole(){
        return [{
            type: "input",
            message: "Please enter a title for this role.",
            name:"title"
        },
        {
            type:"number",
            message:"Please enter a salary for this role.",
            name:"salary"
        },
        {
            type:"list",
            message:"Please enter the department this role belongs to.",
            name:"department",
            choices:[]
        }];
    }
    get addEmployee(){
        return [{
            type: "input",
            message: "Please enter the first name of the employee.",
            name:"first_name"
        },
        {
            type:"input",
            message:"Please enter the last name of the employee.",
            name:"last_name"
        },
        {
            type:"list",
            message:"Please enter the role of this employee.",
            name:"role",
            choices:[]
        },
        {
            type:"list",
            message: "Please enter the manager for this employee.",
            name:"manager",
            choices:[]
        }];
    }
    get deleteEmployee(){
        return {
            type: "list",
            message: "Please select the employee you would like to remove.",
            choices:[],
            name:"employee"
        };
    }
    get deleteRole(){
        return {
            type: "list",
            message: "Please select the role you would like to remove.",
            choices:[],
            name:"role"
        };
    }
    get deleteDepartment(){
        return {
            type: "list",
            message: "Please select the department you would like to remove.",
            choices:[],
            name:"department"
        };
    }
    get updateEmployeeRole(){
        return [{
            type: "list",
            message: "Please select the employee you would like to update.",
            choices:[],
            name:"employee"
        },
        {
            type:"list",
            message:"Please choose a new role for this employee.",
            choices:[],
            name:"role"
        }];
    }
    get confirmInput(){
        return {
            type: "confirm",
            message: "",
            name:"confirm"
        }
    }
}

module.exports = Questions;

