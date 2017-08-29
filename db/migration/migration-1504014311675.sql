CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_digest TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS comments
(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  movie_title VARCHAR(255),
  comment TEXT
);
