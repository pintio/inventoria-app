CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    supplier_name TEXT UNIQUE
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    unique_id UUID DEFAULT uuid_generate_v4(),
    email_id TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    fullname TEXT,
    position TEXT,
    joining_date DATE
);

CREATE TABLE warehouses (
    id SERIAL PRIMARY KEY,
    warehouse_name TEXT UNIQUE
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_name TEXT UNIQUE
);

CREATE TABLE materials (
    id SERIAL PRIMARY KEY,
    material_name TEXT UNIQUE,
    last_update TIMESTAMP,
    quantity INTEGER,
    price MONEY,
    minimum_quantity INTEGER,
    category_id SMALLINT REFERENCES categories(id),
    warehouse_id SMALLINT REFERENCES warehouses(id),
    received_by SMALLINT REFERENCES users(id),
    supplier_id SMALLINT REFERENCES suppliers(id)
);

