-- DEPARTMENT VALUES TO INSERT
INSERT INTO department (id, departmentName);
VALUES ('Engineering', 'Finance', 'Legal', 'Sales');

-- ROLE VALUES TO INSERT
INSERT INTO role (title, salary, department_id);
VALUES 
-- engineering
("Senior Engineer", 250000, 1),
("Junior Engineer", 170000, 1),
("Lead Engineer", 190000, 1),
-- financial
("Bookkeeping", 130000, 2),
("Budgets and forecasting", 95000, 2),
("Management of Taxes", 110000, 2),
-- legal
("Head of Legal ", 195000, 3),
("Legal Director", 192500, 3),
("Legal Manager", 90000, 3),
-- sales
("Administration", 100000, 4),
("Operations manager", 145000, 4),
("Success Planner", 90000, 4);

-- EMPLOYEE VALUES TO INSERT
INSERT INTO employee (first_name, last_name, role_id, manager_id);
VALUES 
('Adam', 'Kin', 1, NULL),
('John', 'Doe', 1, 1),
('Zach', 'Tyler', 1, NULL),
('Mae', 'Whitman', 2, 3),
('Jack', 'DeSena', 2, 3),
('Makoto', 'Iwamatsu', 2, NULL),
('Dante', 'Basco', 3, 6),
('Greg', 'Baldwin', 3, 6),
('Bradley', 'Baker', 3, NULL),
('Jessie', 'Flower', 4, 7),
('Grey', 'DeListle', 4, 5),
('Olivia', 'Hack', 4, NULL);

       