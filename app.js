const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");


const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var teamPrompt = [];

  async function managerPrompt
  () {
    let options = await inquirer.prompt([
      {
        type: "input",
        message: "What is the team manager's full name?",
        name: "name"
      },
      {
        type: "input",
        message: "What is the manager's ID number?",
        name: "id"
      },
      {
        type: "input",
        message: "What is the manager's email address?",
        name: "email"
      },
      {
        type: "input",
        message: "What is the manager's office phone number?",
        name: "number"
      }
    ]);
    var employee= new Manager(options.name,options.id,options.email,options.number)
    teamPrompt.push(employee);
  };
  

  async function engineerPrompt() {
    var options = await inquirer.prompt([
      {
        type: "input",
        message: "What is the engineer's name?",
        name: "name"
      },
      {
        type: "input",
        message: "What is the engineer's ID?",
        name: "id"
      },
      {
        type: "input",
        message: "What is the engineer's email?",
        name: "email"
      },
      {
        type: "input",
        message: "What is the engineer's Github username?",
        name: "github"
      }
    ]);
    var employee= new Engineer(options.name,options.id,options.email,options.github)
    teamPrompt.push(employee);
  };

  async function internPrompt() {
    let options = await inquirer.prompt([
      {
        type: "input",
        message: "What is the intern's name?",
        name: "name"
      },
      {
        type: "input",
        message: "What is the intern's ID?",
        name: "id"
      },
      {
        type: "input",
        message: "What is the intern's email?",
        name: "email"
      },
      {
        type: "input",
        message: "Which school does the intern attend?",
        name: "school"
      }
    ]);
    var employee= new Intern(options.name,options.id,options.email,options.school)
    teamPrompt.push(employee);
  };

  const addTeamMember = async()=>{
    let options = await inquirer.prompt(
      {
        type: "input",
        name: "employee",
        message: "Let's add another employee. Type 'Engineer' or 'Intern' to add.",
        choices: ["Engineer","Intern"]
      }
    )
    if (options.employee==="Engineer"){
      await engineerPrompt();
      addMore();
    }
    else if (options.employee==="Intern"){
      await internPrompt();
      addMore();
    }
  }


  const addMore = async()=>{
    let options = await inquirer.prompt(
      {
        type: "input",
        name: "employee",
        choices: ["Add","Done"],
        message: "Type 'Add' to add another employee or 'Done' to generate the roster."
      }
    )
    if (options.employee==="Add"){
      addTeamMember();
    }
    else if (options.employee==="Done"){
      done();
    }
    else {
    console.log("Done")
    }
  }
  
  const generateRoster = async()=>{
    await managerPrompt();
    addTeamMember();
  }

  const done = async()=>{

    fs.writeFileSync(outputPath, render(teamPrompt),"utf-8") 
  }

  generateRoster();