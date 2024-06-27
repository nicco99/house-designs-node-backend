### Database tables creation

```txt

CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name TEXT,
    description BIGINT
);

CREATE TABLE Plan (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    county TEXT,
    location TEXT,
    plan_size INT,
    plan_name TEXT,
    no_of_bedrooms BIGINT,
    no_of_bathrooms BIGINT,
    category_id BIGINT,
    class_of_finishes BIGINT,
    contract_type BIGINT,
    price_per_sqm BIGINT,
    price BIGINT,
    plinth_area TEXT,
    floor BIGINT,
    description TEXT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE Images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    image_path TEXT,
    image_name BIGINT,
    plan_id BIGINT,
    FOREIGN KEY (plan_id) REFERENCES Plan(id)
);

CREATE TABLE Features (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    description BIGINT
);

CREATE TABLE PlanFeatures (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    plan_id BIGINT,
    feature_id BIGINT,
    FOREIGN KEY (plan_id) REFERENCES Plan(id),
    FOREIGN KEY (feature_id) REFERENCES Features(id)
);

```

## Database interaction

I'll be using a tool known as mysql2 to interact with my db. This is achieved by writting raw queries in query method. Dive! with me and follow my api development to witness.

