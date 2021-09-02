CREATE TABLE products (
	product_id SERIAL PRIMARY KEY,
	category_id INTEGER NOT NULL,
	name VARCHAR(150) NOT NULL,
  url VARCHAR(150) NOT NULL,
  image VARCHAR(50) NULL,
  description VARCHAR(1024) NULL,
  specs jsonb NULL,
  price int4 NULL DEFAULT 0,
  in_stock bool NOT NULL DEFAULT false,
  FOREIGN KEY(category_id) REFERENCES categories(category_id) ON DELETE RESTRICT ON UPDATE CASCADE
);



ALTER TABLE public.products ADD created_at date NOT NULL DEFAULT CURRENT_DATE;
