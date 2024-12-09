
CREATE TABLE roles (
   role_id INT not null auto_increment primary key,
   role_name VARCHAR(500)
);


CREATE TABLE users (
   id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
   first_name VARCHAR(100),
   last_name VARCHAR(100),
   email_address VARCHAR(150) UNIQUE,
   password VARCHAR(1000),
   birth_date DATE,
   role_id INT not null,
   constraint FK_users_role_id foreign key(role_id) references roles(role_id)
);


CREATE TABLE orders (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    date DATETIME,
    user_id INT,
    payment_status VARCHAR(50),
    status VARCHAR(50),
    product_name VARCHAR(250),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE products (
      id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
      size INT,
      weight INT,
      name VARCHAR(100),
      price INT
);

CREATE TABLE products_orders (
     product_id INT,
     order_id INT,
     amount INT,
     PRIMARY KEY (product_id, order_id),
     FOREIGN KEY (product_id) REFERENCES products(id),
     FOREIGN KEY (order_id) REFERENCES orders(id)
);

