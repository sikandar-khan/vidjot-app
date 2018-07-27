const express = require('express');

const {
    Idea
} = require('../models/idea');
const {
    validateFields
} = require('../libs/validation');
const {
    authenticated
} = require('../libs/auth');

const router = express.Router();

router.get('/', authenticated, (req, res) => {
        Idea.find({
                user: req.user.id
            })
            .then((ideas) => {
                res.render('ideas/index', {
                    ideas
                });
            });
    })
    .get('/add', authenticated, (req, res) => {
        res.render('ideas/add');
    })
    .get('/edit/:id', authenticated, (req, res) => {
        Idea.findOne({
            _id: req.params.id,
            user: req.user.id
        }).then((idea) => {
            if (idea) {
                res.render('ideas/edit', {
                    idea
                })
            } else {
                res.redirect('/ideas');
            }
        })
    });

router.post('/', authenticated, (req, res) => {
    validateFields({
            data: req.body
        })
        .then(() => {
            req.body.user = req.user.id;
            new Idea(req.body).save()
                .then(() => {
                    req.flash('success_msg', 'Video idea added');
                    res.redirect('/ideas');
                }).catch((error) => {
                    res.send(404)
                });
        })
        .catch((e) => {
            req.body.errors = e;
            res.render('ideas/add', req.body);
        });
});

router.put('/:id', authenticated, (req, res) => {
    Idea.findById(req.params.id)
        .then((idea) => {
            idea.title = req.body.title,
                idea.details = req.body.details
            idea.save()
                .then((idea) => {
                    req.flash('success_msg', 'Video idea updated');
                    res.redirect('/ideas');
                });
        });
});

router.delete('/:id', authenticated, (req, res) => {
    Idea.remove({
            _id: req.params.id
        })
        .then(() => {
            req.flash('success_msg', 'Video idea removed');
            res.redirect('/ideas');
        });
});

module.exports = router;