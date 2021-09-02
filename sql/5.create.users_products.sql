CREATE TABLE users_products (
  user_id INTEGER NOT NULL,
	product_id INTEGER NOT NULL,
	wishlist bool NOT NULL DEFAULT false,
	comment varchar NULL,
	PRIMARY KEY (user_id, product_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE ON UPDATE CASCADE
);