const bcrypt = require('bcryptjs');
const {
    User
} = require('../models/user');

const saveUser = (user) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (e, salt) => {
            bcrypt.hash(user.password, salt, (e, hash) => {
                if (e) throw e;
                new User({
                        name: user.name,
                        email: user.email,
                        password: hash
                    })
                    .save()
                    .then((result) => {
                        resolve(result);
                    }).catch((err) => {
                        reject([{
                            text: err.message.substring(err._message ? err._message.length + 2 : 0)
                        }]);
                    });
            });
        });
    });
}
module.exports = {
    saveUser
}