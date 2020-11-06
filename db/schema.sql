DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;



Create Table department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);


Create Table role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (50) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
);


Create Table employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (50) UNIQUE NOT NULL,
    last_name varchar(50) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
);