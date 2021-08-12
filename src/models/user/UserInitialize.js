const Database = require('../../config/config')

async function inicializar(user) {
    const db = await Database();

    return await db.all('SELECT * FROM users WHERE username = ?', [user]);
}

module.exports = inicializar