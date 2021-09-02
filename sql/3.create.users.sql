CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	role_id INTEGER default 1,
	first_name varchar(50) NULL,
	last_name varchar(50) NULL,
	email varchar(50) NOT null UNIQUE,
	"password" varchar(255) NOT NULL,
	active bool NOT NULL DEFAULT false,
	gender gend default 'n',
	reg_date date NOT NULL DEFAULT CURRENT_DATE,
	birthday date NULL,
  last_login date NULL,
	address varchar(100) NULL,
  avatar VARCHAR(50) NULL
);



ALTER TABLE public.users ADD last_login date NULL;
