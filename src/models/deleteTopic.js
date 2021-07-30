const Database = require('../config/config');

async function search(lang) {
    const db = await Database();

    await db.run('DELETE FROM langs WHERE lang = ?', [lang]);

    await db.close();
}

module.exports = search