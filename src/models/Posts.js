const Database = require('../config/config');

async function posts() {
    const db = await Database();
    const posts = await db.all('SELECT * FROM posts WHERE id <= 200');
    const langs = await db.all('SELECT * FROM langs');
    await db.close();

    return posts.reverse();
}

module.exports = posts