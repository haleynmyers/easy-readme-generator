const fs = require("fs");
const inquirer = require("inquirer");
const path = require('path');
// const createMarkdown = require('./createMarkdown');
const prompts = [
  {
    type: "input",
    message: "What is your project name?",
    name: "title"
  },
  {
    type: "input",
    message: "What is a brief description of your project?",
    name: "description"
  },

];


function createMarkdown() {
  return `
  * ${response.title}
  ** ${response.description}
  * Table of Contents
  * Installation
  * Usage
  * License
  * Contributing
  * Tests
  * Questions
  
  
  `
};

function writeToFile(fileName, data){
  return fs.writeFileSync(path.join(process.cwd(), fileName), data)
};

function init(){
  inquirer
    .prompt(prompts).then(function(response){
      writeToFile("README.md", createMarkdown({...response}))
    // , function(err) {
    
    //       if (err) {
    //         return console.log(err);
    //       }
    //       console.log("Success!");
        
    //     });
    // });
})};

init();
