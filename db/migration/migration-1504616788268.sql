CREATE TABLE IF NOT EXISTS movie_reviews
(
  id SERIAL PRIMARY KEY,
  display_title VARCHAR(255),
  critics_pick  VARCHAR(3),
  summary_short TEXT,
  opening_date CHAR(10),
  publication_date CHAR(10),
  mpaa_rating VARCHAR(255),
  link_url TEXT
);
