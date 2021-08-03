const Database = require('../config/config');

async function deletePost(id) {
    const db = await Database();

    await db.run('DELETE FROM posts WHERE id = ?', [id]);
    await db.close();
}

async function deletePost2(user, id) {
    const db = await Database();

    const post = db.all('SELECT * FROM posts WHERE id = ? AND author_name = ?', [id, user]);
    return post
}

module.exports = {deletePost, deletePost2}