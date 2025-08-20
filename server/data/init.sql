CREATE TABLE IF NOT EXISTS azkars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    arabic TEXT NOT NULL,
    transliteration TEXT,
    translation TEXT,
    category TEXT,
    count INTEGER DEFAULT 1
);


INSERT INTO azkars (arabic, transliteration, translation, category, count) VALUES
