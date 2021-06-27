const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

module.exports = () =>
    open({
        // filename: './src/database/database.sqlite',
        filename: path.resolve(__dirname,'database.sqlite'),
        driver: sqlite3.Database,
    })
