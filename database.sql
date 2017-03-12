CREATE TABLE employee_information (
    id SERIAL PRIMARY KEY,
    first_name character varying(60) NOT NULL,
    last_name character varying(80) NOT NULL,
    id_number integer NOT NULL,
    job_title character varying(60) NOT NULL,
    annual_salary integer NOT NULL,
    active BOOLEAN DEFAULT true
);

CREATE TABLE employee_budget (
    id SERIAL PRIMARY KEY,
    month varchar(15),
    monthly_budget integer
);

-- dummyData

INSERT INTO employee_information (first_name, last_name, id_number, job_title, annual_salary, active)
VALUES ('Arrielle', 'Kooiman', 00123, 'Boss', 12000, true),
('Alex', 'Seabold', 00124, 'Sub-boss', 1200, true),
('Manny', 'Makier', 00134, 'Not a boss', 1200, false),
('Joe', 'Phish', 02399, 'Random Employee', 120, false);

INSERT INTO employee_budget (monthly_budget)
VALUES (300000);

INSERT INTO employee_budget (monthly_budget, month)
VALUES (300000, 'January');
