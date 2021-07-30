const Database = require('../config/config');

async function langs() {
    const db = await Database()
    const langs = await db.all('SELECT * FROM langs');
    await db.close();
    
    return langs;
}

async function searchLang(lang) {
    const db = await Database();
    const langs = await db.all('SELECT * FROM langs WHERE lang like ?', [lang]);
    await db.close();

    if (langs.length > 0) {
        return true
    } else return false;

    return;
}

module.exports = {langs, searchLang}