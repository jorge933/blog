const Database = require('../config/config');

async function search(where, user) {
    const db = await Database();
    let query;

    if (where === 'email') {
        const q = await db.all('SELECT * FROM users WHERE email = ?', [user]);
        query = q;
    } else if (where === 'id') {
        const q = await db.all('SELECT * FROM users WHERE idEA = ?', [user]);
        query = q;
    } else {
        const q = await db.all('SELECT * FROM users WHERE username = ?', [user]);
        query = q;
    }
    await db.close();

    if (query.length > 0) {
        return query;
    } else {
        const noUsers = true;
        return noUsers
    }
}

module.exports = search