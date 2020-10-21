use employees;

INSERT INTO department (name)
VALUES ('Development'), ('Quality Assurance'), ('Human Resources'), ('Operations');

INSERT INTO role
(title, salary, department_id)

VALUES
('Development Lead', 150000, 1), ('Developer', 100000, 1),
('Lead Test Engineer', 150000, 2), ('Test Engineer', 100000, 2),
('HR Manager', 110000, 3), ('HR Representive', 80000, 3),
('Operations Lead', 140000, 4), ('Operations Engineer', 90000, 4);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)

VALUES
('Cristina', 'Gonzalez', 1, NULL), ('Krista', 'Scott', 2, 1), ('Cassandra', 'Bass', 3, NULL),
('Joshua', 'Hill', 4, 3), ('Imani', 'Dawson', 5, NULL), ('Kyle', 'Willis', 6, 5),
('Rudra', 'Singh', 7, NULL), ('Matthew', 'Johnson', 8, 7);