CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email_address VARCHAR(150) UNIQUE
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

INSERT INTO users (first_name, last_name, email_address) VALUES
('John', 'Doe', 'john.doe@example.com'),
('Jane', 'Smith', 'jane.smith@example.com'),
('Alice', 'Brown', 'alice.brown@example.com'),
('Bob', 'White', 'bob.white@example.com');

INSERT INTO products (size, weight, name, price) VALUES
(10, 500, 'Laptop', 1000),
(5, 300, 'Tablet', 500),
(2, 100, 'Smartphone', 800),
(1, 50, 'Smartwatch', 200),
(20, 7000, 'Desktop', 1500);

INSERT INTO orders (date, user_id, payment_status, status) VALUES
(NOW(), 1, 'Paid', 'Shipped'),
(NOW(), 2, 'Pending', 'Processing'),
(NOW(), 3, 'Paid', 'Delivered'),
(NOW(), 4, 'Failed', 'Cancelled');

INSERT INTO products_orders (product_id, order_id, amount) VALUES
(1, 1, 1),  -- 1 Laptop in Order 1
(2, 1, 2),  -- 2 Tablets in Order 1
(3, 2, 1),  -- 1 Smartphone in Order 2
(4, 2, 1),  -- 1 Smartwatch in Order 2
(5, 3, 1),  -- 1 Desktop in Order 3
(1, 3, 1);  -- 1 Laptop in Order 3
