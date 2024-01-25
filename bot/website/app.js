const express = require('express');
const exphbs = require('express-handlebars');
const sqlite3 = require('sqlite3');

const app = express();

// Set up Handlebars as the view engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Set up SQLite database connection
const db = new sqlite3.Database('./database/data/yueDB.db');

// Define the getWeb function
const getWeb = () => {
    // Define routes
    app.get('/', (req, res) => {
        // Fetch user count and thread count from the database (replace the queries accordingly)
        const userCountQuery = 'SELECT COUNT(*) as userCount FROM users';
        const threadCountQuery = 'SELECT COUNT(*) as threadCount FROM threads';

        db.all(userCountQuery, [], (err, userRows) => {
            db.all(threadCountQuery, [], (err, threadRows) => {
                const userCount = userRows[0].userCount;
                const threadCount = threadRows[0].threadCount;

                res.render('home', { userCount, threadCount });
            });
        });
    });

    app.get('/sql', (req, res) => {
        res.render('sql');
    });
};

// Export the getWeb function
module.exports = {
    getWeb,
};