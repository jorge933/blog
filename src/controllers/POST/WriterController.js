const Database = require('../../config/config')

module.exports = {
    async index(req, res) {
        if (!req.user) return res.redirect('/');
        
        const {displayName:user, picture} = req.user;
        const { reason } = req.body;

        if (user && picture && reason) {
            if (reason.length < 20) return res.redirect('/');

            const db = await Database();
            const created_at = new Date();

            let date = `${created_at.getDate()}`;
            let month = `${created_at.getMonth() + 1}`
            let hours = created_at.getHours();
            let minutes = created_at.getMinutes();

            if (date > 0 && date <= 9) date = `0${created_at.getDate()}`;
            if (month > 0 && month <= 9) month = `0${created_at.getMonth() + 1}`;
            if (hours > 0 && hours <= 9) hours = `0${created_at.getHours() - 3}`;
            if (minutes > 0 && minutes <= 9) minutes = `0${created_at.getMinutes()}`;

            const final_date = `Pedido feito em ${date}/${month}/${created_at.getFullYear()} ás ${hours}:${minutes}`;

            const already_asked_writer = await db.all('SELECT * FROM new_writers WHERE user = ?', [user]);
            const already_writer = await db.all('SELECT * FROM new_writers WHERE user = ? AND writer = "true"', [user]).catch(e => console.log('e'));
            await db.close();
            if (already_asked_writer.length > 0) return res.send('Você ja solicitou para ser escritor aguarde mais um pouco!');
            if (already_writer.length > 0) return res.send('Você ja é um escritor!!!');

            await db.run('INSERT INTO new_writers (user, picture, reason, date) VALUES(?, ?, ?, ?)', [user, picture, reason, final_date]);
            await db.close();
            return res.send('seu pedido para ser um escritor foi recebido com sucesso');
        } else {
            return res.redirect('/');
        }

        return res.sendStatus(500); // se cair aq algo ocorreu de errado
    }
}