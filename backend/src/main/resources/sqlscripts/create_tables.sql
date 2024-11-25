CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email_address VARCHAR(150) UNIQUE
);


CREATE TABLE orders (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    date DATETIME,
    user_id BIGINT,
    payment_status VARCHAR(50),
    status VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id)
);


CREATE TABLE products_orders (
    product_id INT,
    order_id BIGINT,
    amount INT,
    PRIMARY KEY (product_id, order_id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);


CREATE TABLE products (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    size INT,
    weight INT,
    name VARCHAR(100),
    price INT
);


