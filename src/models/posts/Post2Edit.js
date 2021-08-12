const Database = require('../../config/config');

async function post(id) {
    const db = await Database();
    const post = await db.all('SELECT * FROM posts WHERE id = ?', [id]);
    return post
}

module.exports = post