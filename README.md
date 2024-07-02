### Database tables creation

```txt

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT,
    description TEXT
);

CREATE TABLE Plan (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plan_size INT,
    plan_name TEXT,
    no_of_bedrooms INT,
    no_of_bathrooms INT,
    category_id INT,
    class_of_finishes INT,
    contract_type TEXT,
    price_per_sqm BIGINT,
    price INT,
    plinth_area TEXT,
    floor BIGINT,
    description TEXT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE Images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_path TEXT,
    image_name TEXT,
    plan_id INT,
    FOREIGN KEY (plan_id) REFERENCES Plan(id)
);

CREATE TABLE Features (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    description TEXT
);

CREATE TABLE PlanFeatures (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    plan_id INT,
    feature_id INT,
    FOREIGN KEY (plan_id) REFERENCES Plan(id),
    FOREIGN KEY (feature_id) REFERENCES Features(id)
);

```

## Database interaction

I'll be using a tool known as mysql2 to interact with my db. This is achieved by writting raw queries in query method. Dive! with me and follow my api development to witness.

