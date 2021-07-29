const Database = require('./config');

const initDb = {
    async init() {
        const db = await Database();

        await db.exec(`
            CREATE TABLE posts(
                id INTEGER PRIMARY KEY,
                title TEXT,
                content TEXT,
                author_name TEXT,
                author_photo TEXT,
                created_at TEXT,
                lang TEXT,
            )
        `);

        await db.exec(`
            CREATE TABLE users(
                id INTEGER PRIMARY KEY,
                username TEXT,
                photo TEXT,
                writer TEXT,
                admin TEXT,
                password TEXT,
                email TEXT,
                admin_level NUMBER
            )
        `)

        await db.exec(`
            CREATE TABLE langs(
                id INTEGER PRIMARY KEY,
                lang TEXT
            )
        `) // tópics

        await db.close();
    }
}

initDb.init();