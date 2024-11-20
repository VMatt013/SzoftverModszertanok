CREATE TABLE orders (
    id INT not null auto_increment primary key,
    date DATE(500),
    user_id INT,
    payment_status VARCHAR(500),
    status VARCHAR(500)
);

CREATE TABLE product_order (
    product_id INT,
    order_id INT,
    amount INT,
    primary key(product_id, order_id)
);

CREATE TABLE products (
    id INT not null auto_increment primary key,
    size INT,
    weight INT,
    name VARCHAR(500),
    price INT
);

