-- Creating the users table
CREATE TABLE users (
    userID TEXT PRIMARY KEY,
    name TEXT,
    vanity TEXT,
    banned BOOLEAN DEFAULT 0,
    settings JSON DEFAULT '{}',
    data JSON DEFAULT '{}'
);

-- Creating the threads table
CREATE TABLE threads (
    threadID TEXT PRIMARY KEY,
    threadName TEXT,
    threadThemeID TEXT,
    emoji TEXT,
    adminIDs JSON DEFAULT '[]',
    imageSrc TEXT,
    approvalMode BOOLEAN,
    members JSON DEFAULT '[]',
    banned BOOLEAN DEFAULT 0,
    settings JSON DEFAULT '{}',
    data JSON DEFAULT '{}',
    isGroup BOOLEAN
);