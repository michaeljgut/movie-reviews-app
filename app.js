const express = require('express');
const path = require('path')
const app = express();
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middle ware
const logger = require('morgan');
app.use(logger('dev'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

// set up static and views
app.use(express.static('public'));

// Set up Routes

const commentsRouter = require('./routes/comment-routes');
app.use('/comments', commentsRouter)

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is up and running. Listening on port ${PORT}`);
});
