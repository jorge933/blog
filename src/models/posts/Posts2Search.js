const Database = require('../../config/config');

module.exports = {
    async index() {
        const db = await Database();

        const q = await db.all('SELECT * FROM posts');
        await db.close();
        return q;
    }
}