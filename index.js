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
            name: "Remove Employee",
            value: "REMOVE_EMPLOYEE"
          },
          {
            name: "Update Employee Role",
            value: "UPDATE_EMPLOYEE_ROLE"
          },
          {
            name: "Update Employee Manager",
            value: "UPDATE_EMPLOYEE_MANAGER"
          },
          {
            name: "View All Roles",
            value: "VIEW_ROLES"
          },
          {
            name: "Add Role",
            value: "ADD_ROLE"
          },
          {
            name: "Remove Role",
            value: "REMOVE_ROLE"
          },
          {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS"
          },
          {
            name: "Add Department",
            value: "ADD_DEPARTMENT"
          },
          {
            name: "Remove Department",
            value: "REMOVE_DEPARTMENT"
          },
          {
            name: "Quit",
            value: "QUIT"
          }
        ]
      }
    ]);

    //Ground control, bring up the right function based on what's chosen
    switch (choice) {
        case "VIEW_EMPLOYEES":
          return viewEmployees();
        case "VIEW_EMPLOYEES_BY_DEPARTMENT":
          return viewEmployeesByDepartment();
        case "VIEW_EMPLOYEES_BY_MANAGER":
          return viewEmployeesByManager();
        case "ADD_EMPLOYEE":
          return addEmployee();
        case "REMOVE_EMPLOYEE":
          return removeEmployee();
        case "UPDATE_EMPLOYEE_ROLE":
          return updateEmployeeRole();
        case "UPDATE_EMPLOYEE_MANAGER":
          return updateEmployeeManager();
        case "VIEW_DEPARTMENTS":
          return viewDepartments();
        case "ADD_DEPARTMENT":
          return addDepartment();
        case "REMOVE_DEPARTMENT":
          return removeDepartment();
        case "VIEW_ROLES":
          return viewRoles();
        case "ADD_ROLE":
          return addRole();
        case "REMOVE_ROLE":
          return removeRole();
        default:
          return quit();
      }
    }

    async function viewEmployees() {
        const employees = await db.findAllEmployees();
      
        console.log("\n");
        console.table(employees);
      
        loadMainPrompts();
      }

      async function viewEmployeesByDepartment() {
        const departments = await db.findAllDepartments();
      
        const departmentChoices = departments.map(({ id, name }) => ({
          name: name,
          value: id
        }));

        const { departmentId } = await prompt([
            {
              type: "list",
              name: "departmentId",
              message: "Which department would you like to see employees for?",
              choices: departmentChoices
            }
          ]);
        
          const employees = await db.findAllEmployeesByDepartment(departmentId);
        
          console.log("\n");
          console.table(employees);
        
          loadMainPrompts();
        }

        async function viewEmployeesByManager() {
            const managers = await db.findAllEmployees();
          
            const managerChoices = managers.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id
            }));
          
            const { managerId } = await prompt([
              {
                type: "list",
                name: "managerId",
                message: "Which employee do you want to see direct reports for?",
                choices: managerChoices
              }
            ]);
          
            const employees = await db.findAllEmployeesByManager(managerId);
          
            console.log("\n");
          
            if (employees.length === 0) {
              console.log("The selected employee has no direct reports");
            } else {
              console.table(employees);
            }
          
            loadMainPrompts();
          }