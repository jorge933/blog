module.exports = {
    index(req, res) {
        if (req.user && req.user.writer) {
            return res.render('new-post', { css: 'new-post', title: 'Novo Post', isLogged: true, name: req.user.displayName, photo: req.user.picture, writer: req.user.writer, admin: req.user.admin });
        } else return res.redirect('/')
    }
}