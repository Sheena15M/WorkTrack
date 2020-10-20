---Always Start with a clean database---
DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;


---Table time---
Create Table department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
);