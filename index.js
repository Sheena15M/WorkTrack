const logo = require("asciiart-logo");
const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");
  
  init();
  
  // Show the logo and load the required prompts
  function init() {
    const logoText = logo({ name: "Employee Manager" }).render();
  
    console.log(logoText);
  
    loadMainPrompts();
  }