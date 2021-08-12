const Database = require('../../config/config');

async function search(lang) {
    const db = await Database();

    const query = await db.all('SELECT * FROM posts WHERE lang like ?', [lang]);
    db.close();
    if (query.length > 0) {
        return query;
    } else {
        const noPosts = true;
        return noPosts
    }
}

module.exports = search