INSERT INTO roles (role_name) values
   ('admin'),
   ('user');

INSERT INTO users (first_name, last_name, email_address, password, birth_date, role_id) VALUES
('John', 'Doe', 'john.doe@example.com', 'password123hashed', '1990-05-15', 1),
('Jane', 'Smith', 'jane.smith@example.com', 'securepassword456hashed', '1985-09-30', 2),
('Alice', 'Johnson', 'alice.johnson@example.com', 'alicePassword789hashed', '1992-07-22', 1),
('Bob', 'Williams', 'bob.williams@example.com', 'bobbySecure123hashed', '1988-03-12', 2),
('Eve', 'Brown', 'eve.brown@example.com', 'eveSafePass321hashed', '1995-01-10', 1);


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
