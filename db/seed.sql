use employees;

INSERT INTO department (name)
VALUES ('Development'), ('Quality Assurance'), ('Human Resources'), ('Operations');

INSERT INTO role
(title, salary, department_id)

VALUES
('Development Lead', 150000, 1), ('Developer', 100000, 1),
('Lead Test Engineer', 150000, 2), ('Test Engineer', 100000, 2),