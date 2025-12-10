-- Run this file to create the users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
