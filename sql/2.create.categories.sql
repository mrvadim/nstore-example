CREATE TABLE categories (
	category_id SERIAL PRIMARY KEY,
  parent_id INTEGER,
	name VARCHAR(50) NOT NULL,
  url VARCHAR(50) NOT NULL UNIQUE,
  image VARCHAR(50) NULL,
  show bool NOT NULL DEFAULT false,
  FOREIGN KEY(parent_id) REFERENCES categories(category_id) ON DELETE RESTRICT ON UPDATE CASCADE
);
