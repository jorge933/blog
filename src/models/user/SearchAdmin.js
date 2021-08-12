const Database = require('../../config/config');

async function search(where, user) {
    const db = await Database();
    let query;

    if (where === 'email') {
        const q = await db.all('SELECT * FROM users WHERE email = ? AND admin = "true"', [user]);
        query = q;
    } else {
        const q = await db.all('SELECT * FROM users WHERE username = ? AND admin = "true"', [user]);
        query = q;
    }
    
    await db.close();

    if (query.length >= 1) {
        return query;
    } else {
        const noAdmins = true;
        return noAdmins
    }
}

module.exports = search