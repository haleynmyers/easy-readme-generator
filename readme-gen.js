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
    message: "What is your project name?",
  },
  {
    type: "input",
    name: "description",
    message: "Please write a brief description of your project?",
  },
  {
    type: "input",
    name: "pictureURL",
    message: "Enter the relative path or URL to an image you want displayed below your title.",
  },
  {
    type: "input",
    name: "picDescription",
    message: "Please write a brief description of your image?",
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
    name: "contributors",
    message: "Did anyone else contribute to this project? Enter their [name](and GitHub Username) here",
  },
  {
    type: "input",
    name: "questions",
    message: "Other than email, what does the user need to know regarding questions they may have?",
  },
];


function createMarkdown(response) {
  return 
  `# ${response.title}

  ![GitHub license](https://img.shields.io/badge/license-${response.license}-blue.svg)

  ## Description
  >${response.description}

  ![${picDescription}](${picture})

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

  ## Contributors
  Special thanks to
  ${response.contributors}

  ## Tests
  You can run the following command to run tests
  \`${response.tests}\`

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
