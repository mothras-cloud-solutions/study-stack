-- Drop existing tables if they exist to avoid conflicts
DROP TABLE IF EXISTS canvases;
DROP TABLE IF EXISTS flashcards;
DROP TABLE IF EXISTS collections;
DROP TABLE IF EXISTS users;

-- -- Create the study_stack database
-- CREATE DATABASE IF NOT EXISTS study_stack;

-- \c study_stack;

-- Create Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

-- Create Collections table
CREATE TABLE collections (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    subjects VARCHAR(255),
    user_id INTEGER REFERENCES users(id)
);

-- Create Flashcards table
CREATE TABLE flashcards (
    id SERIAL PRIMARY KEY,
    term VARCHAR(255) NOT NULL,
    definition TEXT NOT NULL,
    confidenceLevel INTEGER NOT NULL,
    keywords TEXT,
    collection_id INTEGER REFERENCES collections(id)
);

-- Create Canvases table
CREATE TABLE canvases (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    imageUrl TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id)
);
