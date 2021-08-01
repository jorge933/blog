const Database = require('../config/config');

module.exports = {
    async load() {
        const db = await Database();
        const writers = await db.all('SELECT * FROM new_writers');

        if (writers.length >= 1) {
            return writers
        } else {
            return true;
        }
    }
}