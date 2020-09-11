const fs = require("fs");
const inquirer = require("inquirer");
const path = require('path');
// const createMarkdown = require('./createMarkdown');
const prompts = [
  {
    type: "input",
    name: "username",
    message: "What is your GitHub username?",
  },
  {
    type: "input",
    name: "email",
    message: "What email is associated with your account?",
  },
  {
    type: "input",
    name: "title",
    message: "What is your project name?",
  },
  {
    type: "input",
    name: "description",
    message: "Please write a brief description of your project?",
  },
  {
    type: "list",
    name: "license",
    message: "Which license best suits your project?",
    choices: ["MIT", "Apache 2.0", "GPL 3.0", "BSD 3", "other"]
  },
  {
    type: "input",
    name: "installation",
    message: "What command should be run to install dependencies?",
  },
  {
    type: "input",
    name: "tests",
    message: "What command should be run to run tests?",
  },
  {
    type: "input",
    name: "usage",
    message: "What does the user need to know about using the repo?",
  },
  {
    type: "input",
    name: "contributing",
    message: "What does the user need to know about contributing to the repo?",
  },
  {
    type: "input",
    name: "questions",
    message: "Other than email, what does the user need to know regarding questions they may have?",
  },
];


function createMarkdown(response) {
  return `
  # ${response.title}

  ![GitHub license](https://img.shields.io/badge/license-${response.license}-blue.svg)

  ## Description
  ${response.description}

  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)
  
  ## Installation
  ${response.installation}

  ## Usage
  ${response.usage}

  ## License
  ${response.license}

  ## Contributing
  ${response.contributing}

  ## Tests
  ${response.tests}

  ## Questions
  ${response.questions}
  Please email me at ${response.email}
  
  `
};

function writeToFile(fileName, data){
  return fs.writeFileSync(path.join(process.cwd(), fileName), data)
};

function init(){
  inquirer
    .prompt(prompts).then(function(response){
      writeToFile("README.md", createMarkdown(response), function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("Success!");
      
      });
    });
};

init();
