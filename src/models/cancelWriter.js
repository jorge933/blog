const Database = require('../config/config');

async function deleteWriter(user) {
    const db = await Database();

    await db.run('DELETE FROM new_writers WHERE user = ?', [user]);
    await db.close();
    return;
}

module.exports = deleteWriter;