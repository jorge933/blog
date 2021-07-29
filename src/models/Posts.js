const Database = require('../config/config');

async function posts() {
    const db = await Database();
    const posts = await db.all('SELECT * FROM posts WHERE id <= 200');

    return posts.reverse();
}

module.exports = posts