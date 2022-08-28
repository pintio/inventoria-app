CREATE TABLE users (
    workspace_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unique_id UUID DEFAULT uuid_generate_v4(),
    email_id TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    fullname TEXT,
    position TEXT,
    joining_date DATE
);

CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    supplier_name TEXT UNIQUE,
    workspace_id UUID REFERENCES users(workspace_id)
);

CREATE TABLE warehouses (
    id SERIAL PRIMARY KEY,
    warehouse_name TEXT UNIQUE,
    workspace_id UUID REFERENCES users(workspace_id)
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category_name TEXT UNIQUE,
    workspace_id UUID REFERENCES users(workspace_id)
);

CREATE TABLE materials (
    id SERIAL PRIMARY KEY,
    material_name TEXT UNIQUE,
    last_update TIMESTAMP,
    quantity INTEGER,
    price MONEY,
    minimum_quantity INTEGER,
    workspace_id UUID REFERENCES users(workspace_id),
    warehouse_id SMALLINT REFERENCES warehouses(id),
    category_id SMALLINT REFERENCES categories(id),
    supplier_id SMALLINT REFERENCES suppliers(id)
);

