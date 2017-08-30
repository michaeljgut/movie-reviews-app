const express = require('express');
const commentsController = require('../controllers/comments-controller');
const commentsRouter = express.Router();
const authHelpers = require('../services/auth/auth-helpers');

commentsRouter.get('/', commentsController.index);
commentsRouter.get('/new', authHelpers.loginRequired, (req, res) => {
  res.render('comments/new', {});
});
commentsRouter.get('/:id', commentsController.show);
commentsRouter.post('/', authHelpers.loginRequired, commentsController.create);
commentsRouter.get('/:id/edit', authHelpers.loginRequired, commentsController.edit);
commentsRouter.put('/:id', authHelpers.loginRequired, commentsController.update);
commentsRouter.delete('/:id', authHelpers.loginRequired, commentsController.destroy);

module.exports = commentsRouter;
