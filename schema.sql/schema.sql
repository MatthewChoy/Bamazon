DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adidas Soccer Ball", "Sports Equiment", 19.99, 3000),
  ("Baseball", "Sports Equitment", 3.99, 10000),
  ("Nike Football", "Sports Equiment", 29.99, 30000),
  ("Andy Warhal posters", "art", 19.99, 50000),
  ("Fear and Loathing in Las Vegas", "Book", 9.99 , 500),
  ("Farewell to Arms", "Book", 9.99, 2000),
  ("How to code for Dummies", "Book", 19.99, 500),
  ("Bud Light", "grocery", 19,99, 500000),
  ("Corona", "grocery", 25.99, 15000),
  ("cocoa butter lotion", "cosmetics", 9.99, 36000),
  ("vitmains", "health", 9.99, 50000),
  ("prepaid cellphone", "electronics", 49,99, 80000);

