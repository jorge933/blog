const Database = require('../config/config');

async function deleteAccount(email) {
    const db = await Database();

    await db.run('DELETE FROM users WHERE email = ?', [email]);
}

module.exports = deleteAccount