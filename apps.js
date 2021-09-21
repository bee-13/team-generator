const Manager = require("./js/manager.js");
const Engineer = require("./js/engineer");
const Intern = require("./js/intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./js/render");
//const Choices = require("inquirer/objects/choices");
//const Choice = require("inquirer/objects/choice");

//global array to hold team info
const group = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function getEmployeeInfo() {
    return inquirer
            .prompt([

            {
                type: "list",
                name: "employee",
                message: "Are you an Engineer, Intern, or Manager?",
                choices: ['Engineer', 'Manager', 'Intern'],
            }, 
            {
            type: "input",
                name: "name",
                message: "Input your name?"
            },
            {
                type: "input",
                name: "id",
                message: "input work id?"   
            },
            {
                type: "input",
                name: "email",
                message: "input email?"
            }
        ])
            .then(answer => {
                if(answer.employee == "Engineer") {
                    return addEngineer(answer);
                }
                else if(answer.employee == "Intern") {
                    return addIntern(answer);
                }
                else if(answer.employee == "Manager") {
                    return addManager(answer);
                }
            })
            .catch(function(err) {
                console.log("Wrong job position, try again");
                console.log(err);
            });
}

getEmployeeInfo();


//
function addManager(val) {
    return inquirer
        .prompt([
        {
            type: "input",
            name: "officeNumber",
            message: "what is your officeNumber?"
        }
    ]).then(answer => {
        let manager = new Manager(val.name, val.id, val.email, answer.officeNumber);
        group.push(manager);
        console.log("added manager");
        console.log(group);
        addEmployee();
    })
}
function addIntern(val) {
        return inquirer
            .prompt([
            {
                type: "input",
                name: "school",
                message: "what is your school name?"
            }
        ]).then(answer => {
            let intern = new Intern(val.name, val.id, val.email, answer.school);
            group.push(intern);
            console.log("added Intern");
            console.log(group);
            addEmployee();
        })
}

function addEngineer(val) {
   return inquirer
        .prompt([
        {
            type: "input",
            name: "github",
            message: "what is your github?"
        }
    ]).then(answer => {
        let engineer = new Engineer(val.name, val.id, val.email, answer.github);
        group.push(engineer);
        console.log("added engineer");
        console.log(group);
        addEmployee();
    })
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "confirm",
                message: "Do you want to add another Employee",
                choices: ["yes", "no"],
            }
        ]).then(function(answer) {
            if(answer.confirm == "yes"){
                getEmployeeInfo();
            }
            else
            {
                var html = render(group);

                fs.writeFile(outputPath, html, function(err) {
                    if(err) {
                        return console.log(err);
                    }

                    console.log("group Html was rendered!");
                });
            }
            
        });
}


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```