const Database = require('../config/config');

async function search(user) {
    const db = await Database();

    const query = await db.all('SELECT * FROM users WHERE email = ? AND admin = "true"', [user]);
    
    db.close();
    if (query.length > 0) {
        return query;
    } else {
        const noAdmins = true;
        return noAdmins
    }
}

module.exports = search