const fs = require("fs");
const inquirer = require("inquirer");
const path = require('path');

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
    message: "What is your project's name?",
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
    choices: ["MIT", "Apache 2.0", "GPL 3.0", "BSD 3", "none"]
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
    message: "What information does someone need in order to contribute to this project?",
  },
  
];


function createMarkdown(response) {
  return `
# ${response.title}

![GitHub license](https://img.shields.io/badge/license-${response.license}-blue.svg)

## Description
>${response.description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation
You will need to run
${response.installation}

## Usage
${response.usage}

## License
![GitHub license](https://img.shields.io/badge/license-${response.license}-blue.svg)

${response.license}
[Learn more about this license](https://opensource.guide/legal/#which-open-source-license-is-appropriate-for-my-project)

## Contributing
${response.contributing}

## Tests
You can use the following command to run tests
\`${response.tests}\`

## Questions
${response.questions}
[Visit my profile](https://github.com/${response.username})
For questions about this program or about contributing, please email me at ${response.email}

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
