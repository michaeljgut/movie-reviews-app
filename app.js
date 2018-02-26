// Main file to set up express and middleware, to set up routes and to listen.
const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const methodOverride = require('method-override');
const flash = require('connect-flash');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middle ware
const logger = require('morgan');
app.use(logger('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(flash());

const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY || 'abc',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// set up static and views
app.use(express.static('public'));

// Set up Routes

const commentsRouter = require('./routes/comment-routes');
app.use('/comments', commentsRouter);

const authRoutes = require('./routes/auth-routes');
app.use('/auth', authRoutes);

const userRoutes = require('./routes/user-routes');
app.use('/user', userRoutes);

const movieReviewsRouter = require('./routes/movie-reviews-routes');
app.use('/movie-reviews', movieReviewsRouter);

app.get('/', (req, res) => {
  res.render('index', {movieReviewMessage: 'Please enter the movie title '});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is up and running. Listening on port ${PORT}`);
});
