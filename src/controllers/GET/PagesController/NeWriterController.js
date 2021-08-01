module.exports = {
    async index(req, res) {
        if (req.user) {
            res.render('escritor', { css: 'escritor', title: 'Ser um escritor', isLogged: true, name: req.user.displayName, photo: req.user.picture, writer: req.user.writer, admin: req.user.admin });
        } else {
            res.sendStatus(403).send('Você não esta logado');
        }
    }
}