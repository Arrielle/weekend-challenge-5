CREATE TABLE employee_information (
    id SERIAL PRIMARY KEY,
    first_name character varying(60),
    last_name character varying(80),
    id_number integer,
    job_title character varying(60),
    annual_salary integer,
    active BOOLEAN SET DEFAULT true
);

CREATE TABLE employee_budget (
    id SERIAL PRIMARY KEY,
    monthly_budget integer
);

-- dummyData

INSERT INTO employee_information (first_name, last_name, id_number, job_title, annual_salary)
VALUES ('Arrielle', 'Kooiman', 00123, 'Boss', 12000, true),
('Alex', 'Seabold', 00124, 'Sub-boss', 1200, true);
('Manny', 'Makier', 00134, 'Not a boss', 1200, false);
('Joe', 'Phish', 02399, 'Random Employee', 120, false);

INSERT INTO employee_budget (monthly_budget)
VALUES (300000);
