---Always Start with a clean database---
DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;


---Table time---
Create Table department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
);

--Which Employee Does What--
Create Table department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR (50) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) References department(id) on delete cascade
);

--Another Employee Table--
Create Table department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (50) UNIQUE NOT NULL,
    last_name DECIMAL NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    CONSTRAINT fk_department FOREIGN KEY (manager_id) References employee (id) on delete set null
);