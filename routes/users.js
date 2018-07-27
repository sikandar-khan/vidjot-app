const express = require('express');
const passport = require('passport');
const flash = require('flash');
const {
    User
} = require('../models/user');
const {
    validateFields
} = require('../libs/validation');
const {
    saveUser
} = require('../crud/user-crud');

const router = express.Router();

router.get('/login', (req, res) => {
        res.render('users/login');
    })
    .get('/register', (req, res) => {
        res.render('users/register');
    })
    .get('/logout', (req, res) => {
        req.logout();
        res.redirect('/users/login');
    })

router.post('/register', (req, res) => {
        validateFields({
                data: req.body,
                matchPassword: [req.body.password, req.body.password2]
            })
            .then(() => {
                return saveUser(req.body);
            })
            .then(() => res.redirect('/users/login'))
            .catch(e => {
                res.render('users/register', {
                    errors: e,
                    name: req.body.name,
                    email: req.body.email
                });
            });
    })
    .post('/login', (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/ideas',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);
    });

module.exports = router;