const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const ideas = require('./routes/ideas');
const users = require('./routes/users');
const passport = require('passport');
require('./libs/connection');
require('./libs/passport')(passport);

const app = express();
const port = process.env.PORT || 5000;

// handlebars midleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});
app.use('/ideas', ideas);
app.use('/users', users);

// app get methods
app
    .get('/', (req, res) => {
        res.render('index', {
            title: 'Welcome'
        });
    })
    .get('/about', (req, res) => {
        res.render('about');
    });


app.listen(port, () => console.log(`server is up on port ${port}`));