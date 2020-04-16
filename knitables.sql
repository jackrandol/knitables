CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL CHECK (first != ''),
      last VARCHAR(255) NOT NULL CHECK (last != ''),
      email VARCHAR(255) NOT NULL UNIQUE,
      imageurl VARCHAR,
      bio VARCHAR(255),
      password VARCHAR(255) NOT NULL CHECK (password != ''),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE sweater(
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL UNIQUE REFERENCES users(id),
    body_image VARCHAR,
    sleeve_right_image VARCHAR,
    sleeve_left_image VARCHAR,
    rib VARCHAR
);

CREATE TABLE wall (
    id SERIAL PRIMARY KEY,
    post VARCHAR(255) NOT NULL CHECK (post != ''),
    project_id INT NOT NULL REFERENCES sweater(id),
    sender_id INT NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
