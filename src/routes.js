const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express.Router();
require('./controllers/auth/GoogleAuth');
const path = require('path')


app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false, cookie: { maxAge: 1000 * 60 * 60 * 24 * 30}}));
app.use(passport.initialize());
app.use(passport.session());

// get ==================================================================================================

const InitializeController = require('./controllers/GET/PagesController/InitializeController');
const NewUser = require('./controllers/auth/NewUser');
const PostsInitializeController = require('./controllers/GET/PostsInitializeController');
const SinglePostController = require('./controllers/GET/SinglePostController');
const PageNewPostController = require('./controllers/GET/PagesController/PageNewPostController');
const PostsFilter = require('./controllers/GET/PostsFilter');
const SearchController = require('./controllers/GET/SearchController')
const NeWriterController = require('./controllers/GET/PagesController/NeWriterController');

app.get('/', InitializeController.index);

app.get('/a', NewUser.index);

app.get('/posts', PostsInitializeController.index);

app.get('/post/:id', SinglePostController.index);

app.get('/posts/lang/:lang', PostsFilter.index);

app.get('/posts/novo-post', PageNewPostController.index);

app.get('/search=', SearchController.index)

app.get('/ser-um-escritor', NeWriterController.index);

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

// post =================================================================================================

const CreatePostController = require('./controllers/POST/CreatePostController');
const WriterController = require('./controllers/POST/WriterController');

app.post('/create-post', CreatePostController.index);
app.post('/ser-um-escritor', WriterController.index);

// auth =================================================================================================

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/a',
        failureRedirect: '/auth/google'
    })
);


// admin =================================================================================================

const NewAdminController = require('./controllers/admin/NewAdminController');
const NewTopicController = require('./controllers/admin/NewTopicController')

const AdminInitialize = require('./controllers/admin/AdminInitialize');
const NewPassController = require('./controllers/admin/NewPassController');
const ManageTopicsController = require('./controllers/admin/ManageTopicsController');

app.get('/admin', AdminInitialize.index);

app.get('/admin/manage-topics', ManageTopicsController.index);

app.post('/new-admin', NewAdminController.index);



app.post('/new-pass', NewPassController.index);

app.post('/new-topic', NewTopicController.index)

module.exports = app