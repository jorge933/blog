const Database = require('../../config/config');

async function edit(title, desc, id, author) {
    const db = await Database();

    await db.run('UPDATE posts SET title = ?, content = ? WHERE id = ? AND author_name = ?', [title, desc, id, author]);
    return;
}

module.exports = edit