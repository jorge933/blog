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
                email TEXT,
                created_at TEXT,
                lang TEXT,
                likes TEXT
            )
        `);

        await db.exec(`
            CREATE TABLE users(
                id INTEGER PRIMARY KEY,
                username TEXT,
                email TEXT,
                photo TEXT,
                writer TEXT,
                admin TEXT,
                password TEXT,
                admin_level INTEGER
            )
        `)

        await db.exec(`
            CREATE TABLE langs(
                id INTEGER PRIMARY KEY,
                lang TEXT
            )
        `) // tópics
        
        await db.exec(`
            CREATE TABLE new_writers(
                id INTEGER PRIMARY KEY,
                user TEXT,
                picture TEXT,
                reason TEXT,
                date TEXT)
        `);

        
        await db.run("INSERT INTO langs (lang) VALUES('Assembly')");
        await db.run("INSERT INTO langs (lang) VALUES('C e derivados')");
        await db.run("INSERT INTO langs (lang) VALUES('CSS')");
        await db.run("INSERT INTO langs (lang) VALUES('Dart')");
        await db.run("INSERT INTO langs (lang) VALUES('Go')");
        await db.run("INSERT INTO langs (lang) VALUES('HTML')");
        await db.run("INSERT INTO langs (lang) VALUES('Java')");
        await db.run("INSERT INTO langs (lang) VALUES('JavaScript')");
        await db.run("INSERT INTO langs (lang) VALUES('Kotlin')");
        await db.run("INSERT INTO langs (lang) VALUES('Matlab')");
        await db.run("INSERT INTO langs (lang) VALUES('PHP')");
        await db.run("INSERT INTO langs (lang) VALUES('Objective-C')");
        await db.run("INSERT INTO langs (lang) VALUES('Python')");
        await db.run("INSERT INTO langs (lang) VALUES('R')");
        await db.run("INSERT INTO langs (lang) VALUES('Ruby')");
        await db.run("INSERT INTO langs (lang) VALUES('SQL')");
        await db.run("INSERT INTO langs (lang) VALUES('Swift')");
        await db.run("INSERT INTO langs (lang) VALUES('Typescript')");

        await db.close();

        console.log('banco e tópicos criados');
    }
}

initDb.init();