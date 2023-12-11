const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

require('babel-register');

const app = express();

const cors = require('cors');

app.use(cors())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('blog_node_cookie'));
app.use(
    session({
        secret: 'blog_node_cookie',
        name: 'session_id', //# 在浏览器中生成cookie的名称key，默认是connect.sid
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 1000 * 30, httpOnly: true }, //过期时间
    }),
);

const mongodb = require('./core/mongodb');

mongodb.connect();

const route = require('./routes/index');

route(app);

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.post('/register', (req, res) => {
    const { name, password, phone, email } = req.body;

    res.json({
        status: 200,
        message: 'Registration success',
        data: {
            name,
            phone,
            email,
            password: 'hashed_password',
            _id: 'generated_id',
            create_time: new Date(),
            update_time: new Date(),
            __v: 0
        }
    });
});
module.exports = app;