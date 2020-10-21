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
//Here are the prompts....has a similar feel to the quiz homework, except more extensive
  async function loadMainPrompts() {
    const { choice } = await prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES"
          },
          {
            name: "View All Employees By Department",
            value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
          },
          {
            name: "View All Employees By Manager",
            value: "VIEW_EMPLOYEES_BY_MANAGER"
          },
          {
            name: "Add Employee",
            value: "ADD_EMPLOYEE"
          },
          {