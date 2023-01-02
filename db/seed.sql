-- DEPARTMENT VALUES TO INSERT
INSERT INTO department (id, departmentName)
VALUES ('Engineering', 'Finance', 'Legal', 'Sales');

-- ROLE VALUES TO INSERT
INSERT INTO role (title, salary, department_id)
VALUES 
-- engineering
("Senior Engineer", 150000, 1),
("Junior Engineer", 70000, 1),
("Lead Engineer", 90000, 1),
-- financial
("Bookkeeping", 90000, 2),
("Budgets and forecasting", 75000, 2),
("Management of Taxes", 65000, 2),
-- legal
("Head of Legal ", 95000, 3),
("Legal Director", 92500, 3),
("Legal Manager", 70000, 3),
-- sales
("Administration", 65000, 4),
("Operations manager", 45000, 4),
("Success Planner", 35000, 4)

-- EMPLOYEE VALUES TO INSERT
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Adam', 'Kin', 1, NULL),
('John', 'Doe', 1, NULL),
('Zach', 'Tyler', 1, NULL),
('Mae', 'Whitman', 2, NULL),
('Jack', 'DeSena', 2, NULL),
('Makoto', 'Iwamatsu', 2, NULL),
('Dante', 'Basco', 3, NULL),
('Greg', 'Baldwin', 3, NULL),
('Bradley', 'Baker', 3, NULL),
('Jessie', 'Flower', 4, NULL),
('Grey', 'DeListle', 4, NULL),
('Olivia', 'Hack', 4, NULL)

       