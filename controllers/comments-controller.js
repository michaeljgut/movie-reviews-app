const Comment = require('../models/comments');

const commentsController = {};

commentsController.index = (req, res) => {
  Comment.findAll()
    .then(comments => {
      res.render('comments/index', { comments: comments });
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

commentsController.create = (req, res) => {
  Comment.create({
      movie_title: req.body.movie_title,
      comment: req.body.comment
    })
    .then(comment => {
      res.redirect(`/comments/${comment.id}`)
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

commentsController.show = (req, res) => {
  Comment.findById(req.params.id)
    .then(comment => {
        res.render('comments/show', { comment: comment })
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

module.exports = commentsController;
