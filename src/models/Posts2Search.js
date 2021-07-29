const Database = require('../config/config');

module.exports = {
    async index() {
        const db = await Database();

        return await db.all('SELECT * FROM posts')
    }
}