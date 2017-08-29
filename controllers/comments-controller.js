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

commentsController.edit = (req, res) => {
  Comment.findById(req.params.id)
    .then(comment => {
      res.render('comments/edit', {
        comment: comment,
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

commentsController.update = (req, res) => {
  Comment.update({
    movie_title: req.body.movie_title,
    comment: req.body.comment
  }, req.params.id).then(comment => {
    res.redirect(`/comments/${comment.id}`);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
}

module.exports = commentsController;
