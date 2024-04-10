-- Drop existing tables if they exist to avoid conflicts
DROP TABLE IF EXISTS canvases CASCADE;
DROP TABLE IF EXISTS flashcards CASCADE;
DROP TABLE IF EXISTS collections CASCADE;

-- Create Collections table
CREATE TABLE collections (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    subjects TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id TEXT,
    created_from_id INTEGER
);

-- Create Flashcards table
CREATE TABLE flashcards (
    id SERIAL PRIMARY KEY,
    term TEXT NOT NULL,
    definition TEXT NOT NULL,
    confidenceLevel INTEGER NOT NULL DEFAULT 0,
    keywords TEXT,
    archived INTEGER NOT NULL DEFAULT 0,
    starred INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    collection_id INTEGER REFERENCES collections(id)
);

-- Create Canvases table
CREATE TABLE canvases (
    id SERIAL PRIMARY KEY,
    archived BOOLEAN NOT NULL,
    canvas_front TEXT,
    canvas_back TEXT,
    flashcards_id INTEGER REFERENCES flashcards(id)
);
