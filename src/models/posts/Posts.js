const Database = require('../../config/config');

async function posts() {
    const db = await Database();
    const posts = await db.all('SELECT * FROM posts ORDER BY id');
    const langs = await db.all('SELECT * FROM langs');
    await db.close();
    const postsFinal = [];
    const numberPosts = posts.length <= 200 ? posts.length : 200;

    for (let i = 0; i <= numberPosts - 1; i++) {
        postsFinal.push(posts[i]);
    }
    
    return postsFinal.reverse();
}

module.exports = posts