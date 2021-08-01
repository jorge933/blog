const Database = require('../config/config');

async function update(user) {
    const db = await Database();
    
    await db.run('DELETE FROM new_writers WHERE user = ?', [user]);
    await db.run('UPDATE users SET writer = "true" WHERE username like ?', [user]);
    await db.close();
}

module.exports = update