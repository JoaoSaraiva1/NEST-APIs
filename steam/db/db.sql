CREATE TABLE items (
    id serial PRIMARY KEY,
    buff_id VARCHAR(50) UNIQUE NOT NULL,
    item_name VARCHAR(255) NOT NULL
);

CREATE TABLE price_history (
    id serial PRIMARY KEY,
    buff_id VARCHAR(50) REFERENCES items(buff_id),
    price DECIMAL NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE purchased_items (
    id serial PRIMARY KEY,
    buff_id VARCHAR(50) REFERENCES items(buff_id),
    quantity INT NOT NULL,
    purchase_price DECIMAL NOT NULL,
    purchase_date DATE NOT NULL
);
