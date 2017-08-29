const express = require('express');
const commentsController = require('../controllers/comments-controller');
const commentsRouter = express.Router();

commentsRouter.get('/', commentsController.index);
commentsRouter.get('/new', (req, res) => {
  res.render('comments/new', {});
});
commentsRouter.get('/:id', commentsController.show);
commentsRouter.post('/', commentsController.create);
commentsRouter.get('/:id/edit', commentsController.edit);
commentsRouter.put('/:id', commentsController.update);

module.exports = commentsRouter;
