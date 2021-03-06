const logo = require("asciiart-logo");
const { prompt } = require("inquirer");

const connection = require("./db/connection")
require("console.table");
  
  init();
//View All employees
  function viewEmployees() {
  connection.query("select * from employee").then(res => {
    console.table(res)
    loadMainPrompts();
  })
}

//Add Employees
function addEmployee() {

  connection.query("select * from role", function(err, response){
    console.log(response)

    let roles = response.map(role => {
      return {
        name: role.title, 
        value: role.id
      }
    })


     prompt([
      {
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        name: "last_name",
        message: "What is the employee's last name?"
      },
      
        {
          type: "list",
          name: "roleid",
          message: "Which Role Does the User have ?",
          choices: roles //put in new array here 
        }
    ]).then(user => {
      console.log(user.first_name)
      console.log(user.last_name)
  
      connection.query("insert into employee set ?", {
        first_name: user.first_name,
        last_name: user.last_name,
        role_id: user.roleid
      })
      loadMainPrompts()
    })
  })
}
//Update Employees
function updateEmployeeRole() {

  connection.query("select * from employee", function(err, res) { 

    let  employees = res.map(employee => {
      return {
        name: employee.first_name,
        value: employee.id
      }
    })

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee?",
        choices: employees
      }
    ]).then(employee => {

  connection.query("select * from role", function(err, response){
    let roles = response.map(role => {
      return {
        name: role.title, 
        value: role.id
      }
    })

     prompt([

        {
          type: "list",
          name: "roleId",
          message: "What new role would you like the employee to have?",
          choices: roles
        }
        
    ]).then(role => {
      console.log(role.roleId)
      console.log(employee.employeeId)
      connection.query("UPDATE employee SET WHERE ?", {
        last_name: val.lastName
      },
      {
        role_id:roleId
      },
      function(err){
        if (err) throw err
        console.table(val)
        startPrompt()

      })
      //loadMainPrompts()
    })
  })
  })
  })
}

//View Departments
function viewDepartments() {
  connection.query("select * from employee").then(res => {
    console.table(res)
    loadMainPrompts();
  })
}

async function viewEmployeesByDepartment() {
  connection.query("select * from department").then(res => {

      let departments = res.map(dep => {
        return {
          name: dep.name,
          value: dep.id
        }
      })

      prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department would you like to see employees for?",
        choices: departments
      }
    ]).then(inqres => {

      connection.query("select employee.first_name FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;", inqres.departmentId).then(res => {
        console.log(res)
        loadMainPrompts();
      })

   
    //console.table(res)
   
  })
  })
}

function viewEmployeesByManager() {
  connection.query("select * from employee").then(res => {
    
    //map over the res, to return name and the id of all the employees. Display those names as the choices int he next 
    //inquirere prompt.

    prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which Employees do you want to see?",
        choices: ["leigh", "Tashena", "Rudra", "Cristina", "Krista", "Imani"] //put in new array here 
      }
    ]).then(employee => {

      //have another connection query, display employees that have the selected manager indicated employee.departmentID

    })

    loadMainPrompts();
  })
}

function viewRoles() {
  connection.query("select * from employee").then(res => {
    console.table(res)
    loadMainPrompts();
  })
}
  
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

    // async function viewEmployees() {
    //     const employees = await db.findAllEmployees();
      
    //     console.log("\n");
    //     console.table(employees);
      
    //     loadMainPrompts();
    //   }

      // async function viewEmployeesByDepartment() {
      //   const departments = await db.findAllDepartments();
      
      //   const departmentChoices = departments.map(({ id, name }) => ({
      //     name: name,
      //     value: id
      //   }));

      //   const { departmentId } = await prompt([
      //       {
      //         type: "list",
      //         name: "departmentId",
      //         message: "Which department would you like to see employees for?",
      //         choices: departmentChoices
      //       }
      //     ]);
        
      //     const employees = await db.findAllEmployeesByDepartment(departmentId);
        
      //     console.log("\n");
      //     console.table(employees);
        
      //     loadMainPrompts();
      //   }

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

          async function removeEmployee() {
            const employees = await db.findAllEmployees();
          
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id
            }));
          
            const { employeeId } = await prompt([
              {
                type: "list",
                name: "employeeId",
                message: "Which employee do you want to remove?",
                choices: employeeChoices
              }
            ]);
          
            await db.removeEmployee(employeeId);
          
            console.log("Removed employee from the database");
          
            loadMainPrompts();
          }
          
  //         async function updateEmployeeRole() {
  //           const employees = await db.findAllEmployees();
          
  //           const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
  //             name: `${first_name} ${last_name}`,
  //             value: id
  //           }));
          
  //           const { employeeId } = await prompt([
  //             {
  //               type: "list",
  //               name: "employeeId",
  //               message: "Which employee's role do you want to update?",
  //               choices: employeeChoices
  //             }
  //           ]);

  //           const roles = await db.findAllRoles();
  
  //   const roleChoices = roles.map(({ id, title }) => ({
  //     name: title,
  //     value: id
  //   }));
  
  //   const { roleId } = await prompt([
  //     {
  //       type: "list",
  //       name: "roleId",
  //       message: "Which role do you want to assign the selected employee?",
  //       choices: roleChoices
  //     }
  //   ]);
  
  //   await db.updateEmployeeRole(employeeId, roleId);
  
  //   console.log("Updated employee's role");
  
  //   loadMainPrompts();
  // }
  
  async function updateEmployeeManager() {
    const employees = await db.findAllEmployees();
  
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { employeeId } = await prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee's manager do you want to update?",
        choices: employeeChoices
      }
    ]);
  
    const managers = await db.findAllPossibleManagers(employeeId);
  
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id
    }));
  
    const { managerId } = await prompt([
      {
        type: "list",
        name: "managerId",
        message:
          "Which employee do you want to set as manager for the selected employee?",
        choices: managerChoices
      }
    ]);

    await db.updateEmployeeManager(employeeId, managerId);
  
    console.log("Updated employee's manager");
  
    loadMainPrompts();
  }
  
  async function viewRoles() {
    const roles = await db.findAllRoles();
  
    console.log("\n");
    console.table(roles);
  
    loadMainPrompts();
  }
  
  async function addRole() {
    const departments = await db.findAllDepartments();
  
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const role = await prompt([
      {
        name: "title",
        message: "What is the name of the role?"
      },
      {
        name: "salary",
        message: "What is the salary of the role?"
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role belong to?",
        choices: departmentChoices
      }
    ]);
  
    await db.createRole(role);
  
    console.log(`Added ${role.title} to the database`);
  
    loadMainPrompts();
  }
  
  async function removeRole() {
    const roles = await db.findAllRoles();
  
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id
    }));
  
    const { roleId } = await prompt([
      {
        type: "list",
        name: "roleId",
        message:
          "Which role do you want to remove? (Warning: This will also remove employees)",
        choices: roleChoices
      }
    ]);
  
    await db.removeRole(roleId);
  
    console.log("Removed role from the database");
  
    loadMainPrompts();
  }

  async function viewDepartments() {
    const departments = await db.findAllDepartments();
  
    console.log("\n");
    console.table(departments);
  
    loadMainPrompts();
  }
  
  async function addDepartment() {
    const department = await prompt([
      {
        name: "name",
        message: "What is the name of the department?"
      }
    ]);
  
    await db.createDepartment(department);
  
    console.log(`Added ${department.name} to the database`);
  
    loadMainPrompts();
  }
  
  async function removeDepartment() {
    const departments = await db.findAllDepartments();
  
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id
    }));
  
    const { departmentId } = await prompt({
      type: "list",
      name: "departmentId",
      message:
        "Which department would you like to remove? (Warning: This will also remove associated roles and employees)",
      choices: departmentChoices
    });
  
    await db.removeDepartment(departmentId);
  
    console.log(`Removed department from the database`);
  
    loadMainPrompts();
  }

  // async function addEmployee() {
  //   const roles = await db.findAllRoles();
  //   const employees = await db.findAllEmployees();
  
  //   const employee = await prompt([
  //     {
  //       name: "first_name",
  //       message: "What is the employee's first name?"
  //     },
  //     {
  //       name: "last_name",
  //       message: "What is the employee's last name?"
  //     }
  //   ]);
  
  //   const roleChoices = roles.map(({ id, title }) => ({
  //     name: title,
  //     value: id
  //   }));
  
  //   const { roleId } = await prompt({
  //     type: "list",
  //     name: "roleId",
  //     message: "What is the employee's role?",
  //     choices: roleChoices
  //   });

  //   employee.role_id = roleId;
  
  //   const managerChoices = employees.map(({ id, first_name, last_name }) => ({
  //     name: `${first_name} ${last_name}`,
  //     value: id
  //   }));
  //   managerChoices.unshift({ name: "None", value: null });
  
  //   const { managerId } = await prompt({
  //     type: "list",
  //     name: "managerId",
  //     message: "Who is the employee's manager?",
  //     choices: managerChoices
  //   });
  
  //   employee.manager_id = managerId;
  
  //   await db.createEmployee(employee);
  
  //   console.log(
  //     `Added ${employee.first_name} ${employee.last_name} to the database`
  //   );
  
  //   loadMainPrompts();
  // }
  
  function quit() {
    console.log("Goodbye!");
    process.exit();
  }